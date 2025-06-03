--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-06-03 18:22:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 19887)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content text NOT NULL,
    "isSummary" boolean DEFAULT false NOT NULL,
    "taskId" uuid NOT NULL,
    "employeeId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18915)
-- Name: department; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.department (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "departmentName" character varying NOT NULL,
    description character varying,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.department OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18905)
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "fullName" character varying,
    password character varying NOT NULL,
    avatar character varying,
    "phoneNumber" character varying,
    email character varying NOT NULL,
    "birthDate" date,
    "isActive" boolean DEFAULT true NOT NULL,
    role public.employee_role_enum DEFAULT 'user'::public.employee_role_enum NOT NULL,
    "departmentId" uuid,
    address character varying,
    "identityCard" character varying,
    "joinDate" date,
    "position" public.employee_position_enum,
    education public.employee_education_enum,
    "workExperience" text,
    "baseSalary" numeric(15,2),
    "bankAccount" character varying,
    "bankName" character varying,
    "taxCode" character varying,
    "insuranceCode" character varying
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 19866)
-- Name: otp_entity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otp_entity (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "employeeId" character varying NOT NULL,
    email character varying NOT NULL,
    otp character varying NOT NULL,
    "isUsed" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "expiresAt" timestamp without time zone NOT NULL
);


ALTER TABLE public.otp_entity OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 19876)
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description text,
    "startDate" date,
    "endDate" date,
    status character varying DEFAULT 'draft'::character varying NOT NULL,
    "departmentId" uuid NOT NULL,
    "managerId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.project OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 19935)
-- Name: project_employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_employee (
    "projectId" uuid NOT NULL,
    "employeeId" uuid NOT NULL
);


ALTER TABLE public.project_employee OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 20009)
-- Name: salary; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salary (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "employeeId" uuid NOT NULL,
    month character varying NOT NULL,
    year integer NOT NULL,
    "baseSalary" numeric(15,2) NOT NULL,
    "workdaySalary" numeric(15,2) NOT NULL,
    "overtimeSalary" numeric(15,2) NOT NULL,
    "performanceBonus" numeric(15,2) NOT NULL,
    "positionAllowance" numeric(15,2) NOT NULL,
    deductions numeric(15,2) NOT NULL,
    "totalSalary" numeric(15,2) NOT NULL,
    note text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "isPaid" boolean DEFAULT false NOT NULL,
    workdays numeric(5,1) NOT NULL,
    "overtimeHours" numeric(5,1) NOT NULL,
    "performanceScore" numeric(5,1) NOT NULL
);


ALTER TABLE public.salary OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 18878)
-- Name: shift; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shift (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "shiftName" character varying NOT NULL,
    "startTime" time without time zone NOT NULL,
    "endTime" time without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "departmentId" uuid
);


ALTER TABLE public.shift OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 19898)
-- Name: sub_task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sub_task (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "taskId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sub_task OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 19923)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description text,
    status public.task_status_enum DEFAULT 'pending'::public.task_status_enum NOT NULL,
    priority integer DEFAULT 3 NOT NULL,
    "startDate" timestamp without time zone,
    "dueDate" timestamp without time zone,
    "startedAt" timestamp without time zone,
    "submittedAt" timestamp without time zone,
    "completedAt" timestamp without time zone,
    "projectId" uuid NOT NULL,
    "assignerId" uuid NOT NULL,
    "supervisorId" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 19942)
-- Name: task_assignee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_assignee (
    "taskId" uuid NOT NULL,
    "employeeId" uuid NOT NULL
);


ALTER TABLE public.task_assignee OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18887)
-- Name: timekeeping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timekeeping (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL,
    "checkInTime" time without time zone NOT NULL,
    "checkOutTime" time without time zone,
    "isLate" boolean DEFAULT false NOT NULL,
    "isEarlyLeave" boolean DEFAULT false NOT NULL,
    note character varying,
    "employeeId" uuid,
    "shiftId" uuid
);


ALTER TABLE public.timekeeping OWNER TO postgres;

--
-- TOC entry 4841 (class 2606 OID 19897)
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- TOC entry 4855 (class 2606 OID 20018)
-- Name: salary PK_3ac75d9585433a6264e618a6503; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary
    ADD CONSTRAINT "PK_3ac75d9585433a6264e618a6503" PRIMARY KEY (id);


--
-- TOC entry 4833 (class 2606 OID 18914)
-- Name: employee PK_3c2bc72f03fd5abbbc5ac169498; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY (id);


--
-- TOC entry 4839 (class 2606 OID 19886)
-- Name: project PK_4d68b1358bb5b766d3e78f32f57; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY (id);


--
-- TOC entry 4829 (class 2606 OID 18886)
-- Name: shift PK_53071a6485a1e9dc75ec3db54b9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shift
    ADD CONSTRAINT "PK_53071a6485a1e9dc75ec3db54b9" PRIMARY KEY (id);


--
-- TOC entry 4831 (class 2606 OID 18897)
-- Name: timekeeping PK_6355aed13961cb5c89db31fb16f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timekeeping
    ADD CONSTRAINT "PK_6355aed13961cb5c89db31fb16f" PRIMARY KEY (id);


--
-- TOC entry 4835 (class 2606 OID 18923)
-- Name: department PK_9a2213262c1593bffb581e382f5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY (id);


--
-- TOC entry 4853 (class 2606 OID 19946)
-- Name: task_assignee PK_a5a6bb56af3bc46c6ed80302cc2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignee
    ADD CONSTRAINT "PK_a5a6bb56af3bc46c6ed80302cc2" PRIMARY KEY ("taskId", "employeeId");


--
-- TOC entry 4837 (class 2606 OID 19875)
-- Name: otp_entity PK_af69f5d9d41ea2100820431b72e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otp_entity
    ADD CONSTRAINT "PK_af69f5d9d41ea2100820431b72e" PRIMARY KEY (id);


--
-- TOC entry 4843 (class 2606 OID 19908)
-- Name: sub_task PK_ccb15801cf521e9c45237f484c5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_task
    ADD CONSTRAINT "PK_ccb15801cf521e9c45237f484c5" PRIMARY KEY (id);


--
-- TOC entry 4849 (class 2606 OID 19939)
-- Name: project_employee PK_d8b12da481a375714c4555f6e8d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_employee
    ADD CONSTRAINT "PK_d8b12da481a375714c4555f6e8d" PRIMARY KEY ("projectId", "employeeId");


--
-- TOC entry 4845 (class 2606 OID 19934)
-- Name: task PK_fb213f79ee45060ba925ecd576e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);


--
-- TOC entry 4850 (class 1259 OID 19948)
-- Name: IDX_09edf18534a6587b290bb1ee74; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_09edf18534a6587b290bb1ee74" ON public.task_assignee USING btree ("employeeId");


--
-- TOC entry 4851 (class 1259 OID 19947)
-- Name: IDX_85cfe535e3ffd256e42c9e4206; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_85cfe535e3ffd256e42c9e4206" ON public.task_assignee USING btree ("taskId");


--
-- TOC entry 4846 (class 1259 OID 19941)
-- Name: IDX_87bd0a0a7d997a5fd9c2823017; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_87bd0a0a7d997a5fd9c2823017" ON public.project_employee USING btree ("employeeId");


--
-- TOC entry 4847 (class 1259 OID 19940)
-- Name: IDX_ad90f912fff6a8a5a0392e2c6d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_ad90f912fff6a8a5a0392e2c6d" ON public.project_employee USING btree ("projectId");


--
-- TOC entry 4856 (class 2606 OID 18924)
-- Name: shift FK_02671579fb9a8607d5197baaeec; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shift
    ADD CONSTRAINT "FK_02671579fb9a8607d5197baaeec" FOREIGN KEY ("departmentId") REFERENCES public.department(id);


--
-- TOC entry 4865 (class 2606 OID 19984)
-- Name: task FK_046d08993652402ee357319274f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_046d08993652402ee357319274f" FOREIGN KEY ("supervisorId") REFERENCES public.employee(id);


--
-- TOC entry 4866 (class 2606 OID 19979)
-- Name: task FK_09b5d16545e8887ad62cb7f98da; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_09b5d16545e8887ad62cb7f98da" FOREIGN KEY ("assignerId") REFERENCES public.employee(id);


--
-- TOC entry 4857 (class 2606 OID 18929)
-- Name: timekeeping FK_09dd37e2a6dde5ebd3cab36c6f3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timekeeping
    ADD CONSTRAINT "FK_09dd37e2a6dde5ebd3cab36c6f3" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- TOC entry 4870 (class 2606 OID 20004)
-- Name: task_assignee FK_09edf18534a6587b290bb1ee749; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignee
    ADD CONSTRAINT "FK_09edf18534a6587b290bb1ee749" FOREIGN KEY ("employeeId") REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4860 (class 2606 OID 19954)
-- Name: project FK_33a588338bd946c9295c316d4bb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_33a588338bd946c9295c316d4bb" FOREIGN KEY ("managerId") REFERENCES public.employee(id);


--
-- TOC entry 4867 (class 2606 OID 19974)
-- Name: task FK_3797a20ef5553ae87af126bc2fe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES public.project(id);


--
-- TOC entry 4861 (class 2606 OID 19949)
-- Name: project FK_45c52bbda319e14db17a546ee3c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT "FK_45c52bbda319e14db17a546ee3c" FOREIGN KEY ("departmentId") REFERENCES public.department(id);


--
-- TOC entry 4858 (class 2606 OID 18934)
-- Name: timekeeping FK_631602e15e9c710e831c62a1573; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timekeeping
    ADD CONSTRAINT "FK_631602e15e9c710e831c62a1573" FOREIGN KEY ("shiftId") REFERENCES public.shift(id);


--
-- TOC entry 4862 (class 2606 OID 19964)
-- Name: comment FK_7a88834dadfa6fe261268bfceef; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_7a88834dadfa6fe261268bfceef" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- TOC entry 4871 (class 2606 OID 19999)
-- Name: task_assignee FK_85cfe535e3ffd256e42c9e4206a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_assignee
    ADD CONSTRAINT "FK_85cfe535e3ffd256e42c9e4206a" FOREIGN KEY ("taskId") REFERENCES public.task(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4868 (class 2606 OID 19994)
-- Name: project_employee FK_87bd0a0a7d997a5fd9c28230179; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_employee
    ADD CONSTRAINT "FK_87bd0a0a7d997a5fd9c28230179" FOREIGN KEY ("employeeId") REFERENCES public.employee(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4859 (class 2606 OID 18939)
-- Name: employee FK_9ad20e4029f9458b6eed0b0c454; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES public.department(id);


--
-- TOC entry 4863 (class 2606 OID 19959)
-- Name: comment FK_9fc19c95c33ef4d97d09b72ee95; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_9fc19c95c33ef4d97d09b72ee95" FOREIGN KEY ("taskId") REFERENCES public.task(id);


--
-- TOC entry 4869 (class 2606 OID 19989)
-- Name: project_employee FK_ad90f912fff6a8a5a0392e2c6d8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_employee
    ADD CONSTRAINT "FK_ad90f912fff6a8a5a0392e2c6d8" FOREIGN KEY ("projectId") REFERENCES public.project(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4872 (class 2606 OID 20019)
-- Name: salary FK_ee746d55416ea53ee1d7b2eb3b7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salary
    ADD CONSTRAINT "FK_ee746d55416ea53ee1d7b2eb3b7" FOREIGN KEY ("employeeId") REFERENCES public.employee(id);


--
-- TOC entry 4864 (class 2606 OID 19969)
-- Name: sub_task FK_fe51338fd9567d08ae3ab4d5a57; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sub_task
    ADD CONSTRAINT "FK_fe51338fd9567d08ae3ab4d5a57" FOREIGN KEY ("taskId") REFERENCES public.task(id);


-- Completed on 2025-06-03 18:22:46

--
-- PostgreSQL database dump complete
--

