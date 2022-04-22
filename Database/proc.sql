/* 
    ###################
    # Wei Howe's Code #
    ###################  
*/

-- ******************* Works *******************
CREATE OR REPLACE PROCEDURE add_employee
    -- This assumes that the employee will always have minimally a mobilenum
    (IN e_name VARCHAR(50), IN mobilenum VARCHAR(50), IN kind VARCHAR(50), IN d_id INTEGER, IN homenum VARCHAR(50) DEFAULT NULL, IN officenum VARCHAR(50) DEFAULT NULL)
AS $$
DECLARE 
new_eid INTEGER:= 0;
new_email VARCHAR(50);
new_password VARCHAR(200);
BEGIN

    SELECT max(eid) INTO new_eid FROM Employees;
    IF (new_eid IS NULL) 
        THEN new_eid = 1;
    ELSE
        new_eid:= new_eid + 1;
    END IF;

    SELECT CONCAT(LOWER(REPLACE(e_name, ' ', '')), CAST(new_eid AS VARCHAR(50)), '@demo_company.com') into new_email;
    SELECT CONCAT('password', CAST(new_eid AS VARCHAR(50))) into new_password;
    /*
    SELECT max(eid) INTO new_eid FROM Employees;
    IF (last_eid IS NULL)
        new_email := CONCAT(1, '@demo_company.com');
    ELSE
        new_eid:= (new_eid + 1)::varchar(50);
        new_email:= CONCAT(new_eid, '@demo_company.com');
    END IF;*/
    
    -- Is there a better way of generating the eid than using AUTOINCREMENT?
    INSERT INTO Employees(ename, mobile_num, home_num, office_num, email, role, did, password)
    VALUES (e_name, mobilenum, homenum, officenum, new_email, kind, d_id, new_password);

    -- Removed insertion of junior/manager/senior here and instead put in trigger help_insert_role()
END;
$$LANGUAGE plpgsql;

-- ******************* Works *******************
CREATE OR REPLACE PROCEDURE remove_employee
    (IN e_id INTEGER, IN resign_d DATE)
AS $$
BEGIN
    UPDATE Employees
    SET resigned_date = resign_d
    WHERE eid = e_id;
END;
$$LANGUAGE plpgsql;

-- ******************* Works ******************* --> haven't test by 3rd party
CREATE OR REPLACE FUNCTION view_future_meeting
    (IN start_date DATE, IN e_id INTEGER)
RETURNS TABLE (date DATE, start_hour TIME, room INTEGER, floor INTEGER) AS $$
BEGIN
    RETURN QUERY SELECT j.date, j.time, j.room, j.floor 
    FROM Joins j, Approves a
    WHERE j.date = a.date
        AND j.time = a.time
        AND j.room = a.room
        AND j.floor = a.floor
        AND j.eid = e_id
        AND j.date >= start_date
    ORDER BY j.date, j.time ASC;
END;
$$LANGUAGE plpgsql;

-- ******************* Works ******************* --> haven't test by 3rd party
CREATE OR REPLACE FUNCTION view_manager_report
    (IN start_date DATE, IN e_id INTEGER)
RETURNS TABLE (date DATE, start_hour TIME, room INTEGER, floor INTEGER, m_eid INTEGER) AS $$
DECLARE 
manager_did INTEGER:= 0;
BEGIN
    
    -- If not manager, do nothing
    IF e_id IN (SELECT eid FROM Manager)
    THEN 
    SELECT did INTO manager_did FROM employees WHERE eid = e_id;
    END IF;

    RETURN QUERY
    -- Get all meetings not approved yet using left join
    WITH all_na AS (
        SELECT b.date, b.time, b.room, b.floor, b.eid
        FROM Books b
        LEFT JOIN Approves a 
        ON b.date = a.date
        AND b.time = a.time
        AND b.room = a.room
        AND b.floor = a.floor
        WHERE aid IS NULL
    )

    SELECT all_na.date, all_na.time, all_na.room, all_na.floor, all_na.eid
    FROM all_na JOIN Meeting_Rooms mr
    ON (all_na.room = mr.room
    AND all_na.floor = mr.floor)
    WHERE all_na.date >= start_date
    AND did = manager_did
    ORDER BY all_na.date, all_na.time ASC;
END;
$$LANGUAGE plpgsql;


/* 
    ###################
    # Wei Xuan's Code #
    ###################  */

--add_room routine
/*
a manager is needed to add a room as the capacity has to be decided by someone
whenever a room is newly added, we assume that the room is not available for booking
on that day, as this was not specified by the document.
*/

-- ******************* Works *******************

/* ERROR: When mid.did not equals to the did, the insertion will go through
for the meeting_rooms but will not go through for updates */

CREATE OR REPLACE PROCEDURE add_room
	(floor INTEGER, room INTEGER, rname VARCHAR(50), room_capacity INTEGER, did INTEGER, mid INTEGER, date DATE)
AS $$
DECLARE
    manager_did INTEGER;
BEGIN
    SELECT Employees.did INTO manager_did 
    FROM Employees
    WHERE mid = Employees.eid;
    -- Prevents insertion as the manager cannot update the capacity of the room.
    IF (manager_did <> did
        OR date < CURRENT_DATE)
        THEN RETURN;
    END IF;

    INSERT INTO Meeting_Rooms 
    VALUES(floor, room, rname, did);

    INSERT INTO Updates 
    VALUES(date, floor, room, room_capacity, mid);
END;
$$LANGUAGE plpgsql;


--change_capacity routine

-- ******************* Works *******************
CREATE OR REPLACE PROCEDURE change_capacity
    (floor INTEGER, room INTEGER, new_capacity INTEGER, date DATE, mid INTEGER)
AS $$
BEGIN
    INSERT INTO Updates
    VALUES (date, floor, room, new_capacity, mid);
END;
$$LANGUAGE plpgsql;


/* search_room routine: 
1st step: get all entries in Updates where date is before query_date
2nd step: filter out Updates so that only the max(date) for each (floor,room) remains --> latest update
3rd step: filter out Updates where new_cap >= required_cap 
4th step: return rooms where --> floor, room not in Books where time >=start_hour and time < end_hour
*/

-- ******************* Works *******************
CREATE OR REPLACE FUNCTION search_room
    (IN required_cap INTEGER, IN query_date DATE, IN start_hour TIME, IN end_hour TIME)
RETURNS TABLE(floor INTEGER, room INTEGER, did INTEGER, available_capacity INTEGER) AS $$
BEGIN



    RETURN QUERY 
    --get the latest updates: step 1 and 2
    WITH latest_updates AS (
        SELECT U.floor, U.room, MAX(U.date) as date
        FROM Updates AS U
        WHERE U.date < query_date
        GROUP BY U.floor, U.room
    ),

    --get the rooms with capactity >= required capacity: step 3
    -- e.g. 3 floor, room which meets the required capacity
    cap_available AS (
        SELECT u.floor, u.room, m.did, u.new_cap
        FROM Updates as u JOIN Meeting_Rooms as m
        ON u.floor = m.floor
            AND u.room = m.room
        WHERE EXISTS (SELECT 1
                        FROM latest_updates as lu
                        WHERE lu.floor = u.floor
                            AND lu.room = u.room
                            AND lu.date = u.date)
        ORDER BY new_cap ASC
    )

    --step 4:
    SELECT c.floor, c.room, c.did, c.new_cap
        FROM cap_available AS c
        WHERE NOT EXISTS (SELECT 1
                        FROM Books AS b
                        WHERE b.time >= start_hour
                            AND b.time < end_hour
                            AND b.floor = c.floor
                            AND b.room = c.room);
END;
$$ LANGUAGE plpgsql;

/* view_booking_report routing
step 1: get all the rooms which were booked
step 2: check if they are approved
*/
--  ******************* Works *******************
CREATE OR REPLACE FUNCTION view_booking_report
    (IN start_date DATE, IN bid INTEGER)
RETURNS TABLE(floor INTEGER, room INTEGER, date DATE, start_hour TIME, is_approved BOOLEAN) AS $$
BEGIN

    RETURN QUERY 

    WITH booked_rooms AS (
        SELECT a.aid, b.eid, b.floor, b.room, b.date, b.time
        FROM Books as b LEFT OUTER JOIN Approves as a
        ON b.date = a.date
            AND b.time = a.time
            AND b.floor = a.floor
            AND b.room = a.room
        WHERE b.date >= start_date
            AND b.eid = bid
    )


    SELECT br.floor, br.room, br.date, br.time, CASE
        WHEN br.aid IS NULL THEN FALSE
        ELSE TRUE
      END AS is_approved
    FROM booked_rooms AS br;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION view_joinable_meetings( IN eid INTEGER )
RETURNS TABLE(floor INTEGER, room INTEGER, date DATE, start_hour TIME) AS $$
BEGIN
    RETURN QUERY

    WITH joinable_meetings AS (
        SELECT b.floor, b.room, b.date, b.time
        FROM Books as b LEFT OUTER JOIN Approves as a
        ON b.date = a.date
            AND b.time = a.time
            AND b.floor = a.floor
            AND b.room = a.room
        WHERE b.date >= CURRENT_DATE
            AND a.aid IS NULL
    )

    SELECT jm.floor, jm.room, jm.date, jm.time
    FROM joinable_meetings AS jm;
END;
$$ LANGUAGE plpgsql;


/*
    ###################
    #    Jon Code     #
    ###################  */
--return_latest_capacity
CREATE OR REPLACE FUNCTION return_latest_capacity_before_input_date
(IN input_floor INTEGER, IN input_room INTEGER, IN input_date DATE)
RETURNS TABLE(latest_capacity INTEGER) AS $$
BEGIN
    SELECT new_cap INTO latest_capacity
    FROM Updates
    WHERE input_floor = floor
    AND input_room = room
    AND date = (SELECT MAX(date)
                FROM Updates
                WHERE input_floor = floor
                AND input_room = room
                AND date < input_date);
    RETURN QUERY SELECT latest_capacity;
END;
$$ LANGUAGE plpgsql;


--book_room
CREATE OR REPLACE PROCEDURE book_room
    (IN floor INTEGER, IN room INTEGER, IN date DATE, IN start_hour TIME, IN end_hour TIME, IN eid INTEGER)
AS $$
DECLARE
    number_of_hours INTEGER;
    time_diff TIME;
    booking_hour TIME := end_hour;
    one_hour TIME := '01:00:00';
BEGIN
    time_diff := end_hour - start_hour;
    SELECT EXTRACT(HOUR FROM time_diff) into number_of_hours;
    WHILE number_of_hours > 0 LOOP
        number_of_hours := number_of_hours - 1;
        booking_hour := booking_hour - one_hour;
        INSERT INTO Books VALUES (eid, date, booking_hour, floor, room);
    END LOOP;
END;
$$ LANGUAGE plpgsql; --this works

--unbook_room
CREATE OR REPLACE PROCEDURE unbook_room
    (IN floor INTEGER, IN room INTEGER, IN date DATE, IN start_hour TIME, IN end_hour TIME, IN eid INTEGER)
AS $$
DECLARE
    number_of_hours INTEGER;
    time_diff TIME;
    booking_hour TIME := end_hour;
    one_hour TIME := '01:00:00';
BEGIN
    SELECT end_hour - start_hour INTO time_diff;
    SELECT EXTRACT(HOUR FROM time_diff) into number_of_hours;
    WHILE number_of_hours > 0 LOOP
        number_of_hours := number_of_hours - 1;
        booking_hour := booking_hour - one_hour;
        CALL remove_booking(eid, date, booking_hour, room, floor);
    END LOOP;
END;
$$ LANGUAGE plpgsql; --this works

CREATE OR REPLACE PROCEDURE remove_booking
     (IN input_eid INTEGER, IN input_date DATE, IN start_hour TIME, IN input_room INTEGER, IN input_floor INTEGER)
AS $$
BEGIN
    DELETE FROM Books
    WHERE input_eid = Books.eid
    AND input_floor = Books.floor
    AND input_room = Books.room
    AND input_date = Books.date
    AND start_hour = Books.time;
END;
$$ LANGUAGE plpgsql; --this works

--join_meeting
CREATE OR REPLACE PROCEDURE join_meeting
    (IN floor INTEGER, IN room INTEGER, IN date DATE, IN start_hour TIME, IN end_hour TIME, IN eid INTEGER)
AS $$
DECLARE
    number_of_hours INTEGER;
    time_diff TIME;
    booking_hour TIME := end_hour;
    one_hour TIME := '01:00:00';
BEGIN
    SELECT end_hour - start_hour INTO time_diff;
    SELECT EXTRACT(HOUR FROM time_diff) into number_of_hours;
    WHILE number_of_hours > 0 LOOP
        number_of_hours := number_of_hours - 1;
        booking_hour := booking_hour - one_hour;
        INSERT INTO Joins VALUES (eid, date, booking_hour, floor, room);
    END LOOP;
END;
$$ LANGUAGE plpgsql; --this works

--leave_meeting
CREATE OR REPLACE PROCEDURE leave_meeting
    (IN floor INTEGER, IN room INTEGER, IN date DATE, IN start_hour TIME, IN end_hour TIME, IN eid INTEGER)
AS $$
DECLARE
    number_of_hours INTEGER;
    time_diff TIME;
    booking_hour TIME := end_hour;
    one_hour TIME := '01:00:00';
BEGIN
    SELECT end_hour - start_hour INTO time_diff;
    SELECT EXTRACT(HOUR FROM time_diff) into number_of_hours;
    WHILE number_of_hours > 0 LOOP
        number_of_hours := number_of_hours - 1;
        booking_hour := booking_hour - one_hour;
        CALL remove_from_meeting(eid, date, booking_hour, room, floor);
    END LOOP;
END;
$$ LANGUAGE plpgsql; --this works

CREATE OR REPLACE PROCEDURE remove_from_meeting
    (IN input_eid INTEGER, IN input_date DATE, IN start_hour TIME, IN input_room INTEGER, IN input_floor INTEGER)
AS $$
BEGIN
    DELETE FROM Joins
    WHERE input_floor = Joins.floor
    AND input_room = Joins.room
    AND input_date = Joins.date
    AND start_hour = Joins.time
    AND input_eid = Joins.eid;
END;
$$ LANGUAGE plpgsql; --this works

--approve_meeting
CREATE OR REPLACE PROCEDURE approve_meeting
    (IN floor INTEGER, IN room INTEGER, IN date DATE, IN start_hour TIME, IN end_hour TIME, IN eid INTEGER)
AS $$
DECLARE
    number_of_hours INTEGER := 0;
    time_diff TIME;
    booking_hour TIME := end_hour;
    one_hour TIME := '01:00:00';
BEGIN
    SELECT end_hour - start_hour INTO time_diff;
    SELECT EXTRACT(HOUR FROM time_diff) into number_of_hours;
    WHILE number_of_hours > 0 LOOP
        number_of_hours := number_of_hours - 1;
        booking_hour := booking_hour - one_hour;
        INSERT INTO Approves VALUES (eid, date, booking_hour, floor, room);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

/* 
    ###################
    # Zhen Hong's Code #
    ###################  */

CREATE OR REPLACE PROCEDURE add_department
    (IN did INTEGER, IN dname VARCHAR(50))
AS $$
BEGIN
    INSERT INTO departments
    VALUES (did, dname);
END;
$$LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE remove_department
    (IN d_id INTEGER)
AS $$
BEGIN
    DELETE FROM departments
    WHERE (did = d_id);
END;
$$LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE declare_health
    (IN eid INTEGER, IN date DATE, IN temp NUMERIC)
AS $$
DECLARE
    has_fever BOOLEAN := FALSE;
BEGIN
    IF (temp > 37.5) 
        THEN has_fever = TRUE;
    END IF;
    INSERT INTO Health_Declaration
    VALUES (eid, date, temp, has_fever);
END;
$$LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION non_compliance
    (IN start_date date, IN end_date date)
RETURNS TABLE(eid INTEGER, days BIGINT) AS $$
DECLARE
    total_days INTEGER:= end_date - start_date + 1;
BEGIN
    IF (start_date > end_date)
        THEN RAISE EXCEPTION 'start_date should be before end_date';
    END IF;
    RETURN QUERY
    -- To find employees who declared and the number of days they declared
    WITH declared_days AS (
        SELECT HD.eid, (total_days - COUNT(*)) AS days
            FROM Health_Declaration as HD
            WHERE date >= start_date
                AND date <= end_date
            GROUP BY HD.eid
            ORDER BY days DESC
    ),

    -- To find employees who made 0 declarations
    no_declaration AS (
        SELECT Employees.eid, total_days as days
        FROM Employees
        WHERE Employees.eid NOT IN (SELECT dd.eid
                        FROM declared_days as dd)
    )

    (SELECT no_declaration.eid, no_declaration.days
    FROM  no_declaration)
    UNION 
    (SELECT declared_days.eid, declared_days.days  FROM 
    declared_days
    WHERE declared_days.days <> 0); --To eliminate employees who had declared for all days
END;
$$LANGUAGE plpgsql;

--contact tracing
/*
step 1: check if employee is having fever -> IF NO FEVER --> RETURN;
ELSE:
    step 1: remove all future bookings by employee
    step 2: check approved meeting room containing employee
    step 3: create table of all employess in those meeting rooms
    step 4: remove close contact employees from meetings for next 7 days --> check eid in JOINS and date > current_date 
*/

/*
    Wei Xuan's Comment: Missing Books & Approved
*/

/*
Possible implementation: 
1. Create a table compromised_employees
2. Create a trigger --> When eid added into compromised_employees, delete all meetings in next 7days
*/

/*
SELECT date, time, room, floor
        FROM Joins
        WHERE Joins.eid = 3
            AND date >= (CURRENT_DATE - 3)
            AND date < CURRENT_DATE
            OR (date = CURRENT_DATE 
            AND time < LOCALTIME)
*/

CREATE OR REPLACE FUNCTION contact_tracing
    (IN e_id INTEGER)
RETURNS TABLE(eid INTEGER) AS $$
DECLARE 
    has_fever BOOLEAN;
    curr_date DATE:=CURRENT_DATE;
BEGIN
    RAISE NOTICE 'Contact Tracing being carried out at: % hrs', LOCALTIME;
    SELECT fever INTO has_fever FROM Health_Declaration WHERE Health_Declaration.eid = e_id;
    IF has_fever = FALSE THEN RETURN;
    END IF;

    --find all meetings where employee attendecd in the past 3 days and on today where time was in the past
    WITH compromised_meetings AS (
        SELECT date, time, room, floor
        FROM Joins
        WHERE Joins.eid = e_id
            AND date >= (curr_date - INTERVAL'3 days')::date
            AND date < curr_date
            OR (date = curr_date 
            AND time < LOCALTIME)
    ),

    -- find all employees which attended the meetings
    compromised_employees AS (
        SELECT J.eid 
        FROM Joins as J, compromised_meetings as CM
        WHERE CM.date = J.date
        AND CM.time = J.time
        AND CM.room = J.room
        AND CM.floor = J.floor
    )

    --Remove employees from next 7 days future meetings where time > LOCALTIME
    DELETE FROM Joins USING compromised_employees
    WHERE compromised_employees.eid = Joins.eid
    AND Joins.date > curr_date
    AND Joins.date <= (curr_date + INTERVAL'7 days')::date
    OR (Joins.date = curr_date
    AND Joins.time >= LOCALTIME);

    -- delete future bookings for employee e_id
    DELETE FROM Books
    WHERE Books.eid = e_id
        AND (Books.date > curr_date 
        OR (Books.date = curr_date 
            AND Books.time > LOCALTIME));

    -- delete future joins for employee e_id
    DELETE FROM Joins 
    WHERE Joins.eid = e_id
    AND Joins.date > curr_date
    AND Joins.date <= (curr_date + INTERVAL'7 days')::date
    OR (Joins.date = curr_date
    AND Joins.time >= LOCALTIME);

    RETURN QUERY 

    -- query for approved meetings which employee attended in the past 3 days
    WITH compromised_meetings AS (
        SELECT J.date, J.time, J.room, J.floor
        FROM Joins J JOIN Approves as a
        ON J.date = a.date
            AND J.time = a.time
            AND J.floor = a.floor
            AND J.room = a.room
        WHERE J.eid = e_id
            AND J.date >= (curr_date - INTERVAL'3 days')::date
            AND J.date <= curr_date
            AND J.time < LOCALTIME
    ),

    -- find all employees which attended the compromised meetings
    compromised_employees AS (
        SELECT distinct(J.eid )
        FROM Joins as J, compromised_meetings as CM
        WHERE CM.date = J.date
        AND CM.time = J.time
        AND CM.room = J.room
        AND CM.floor = J.floor
        AND J.eid <> e_id
    )
    
    SELECT * FROM compromised_employees;

END;
$$LANGUAGE plpgsql;

