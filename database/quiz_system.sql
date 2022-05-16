-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2022 at 05:24 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `competition`
--

CREATE TABLE `competition` (
  `id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_score` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`answers`))
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `option_a` text NOT NULL,
  `option_b` text NOT NULL,
  `option_c` text NOT NULL,
  `option_d` text NOT NULL,
  `answer` int(11) NOT NULL,
  `level` varchar(10) NOT NULL,
  `category` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `answer`, `level`, `category`) VALUES
(1, 'Which Unit performs the Mathematical operations in CPU ? ', 'Memory Unit', 'Control Unit', 'Input Output Unit', 'Arithmetic Logical Unit', 4, 'easy', 'Computer B'),
(2, 'What is the Direction of the Address Buss ?', 'Unidirectional', 'Bidirectional', 'Multidirectional', 'None of the above', 1, 'easy', 'Computer B'),
(3, 'Which Computer Architecture is implemented in Cache memory ?', 'Von Neumann\'s Architecture', 'Harvard Architecture', 'Instruction Set Architecture', 'None of the above', 2, 'easy', 'Computer B'),
(4, 'Which Bus is the carried the Address from CPU to Memory ?', 'Data Bus', 'Control Bus', 'Address Bus', 'All of the above', 3, 'easy', 'Computer B'),
(5, 'Which of the following is the Primary or Main Memory of the CPU ?', 'Registers', 'Random Access Memory(RAM)', 'Read Only Memory(ROM)', 'semiconductors', 2, 'easy', 'Computer B'),
(6, 'The CPU has 8-bits instruction,the Opcode of that instruction is 3-bit remaining 5-bit are Information so what is the Maximum Opcode size ?', '3', '5', '8', '32', 3, 'easy', 'Computer B'),
(7, 'The brain of the Computer System is ?', 'ALU', 'CPU', 'Memory', 'Control Unit', 2, 'easy', 'Computer B'),
(8, 'Which Computer Architecture we are using in now a days computers ?', 'Von Neumann\'s Architecture', 'Harvard Architecture', 'Princeton Architecture', 'None of the above', 1, 'easy', 'Computer B'),
(9, 'One millisecond is what ?', '1 second', '10th of a seconds', '100th of a seconds', '1000th of a seconds', 4, 'easy', 'Computer B'),
(10, 'Which of the following is not an Operating System ?', 'Windows', 'Linux', 'DOS', 'Oracle', 4, 'medium', 'Operating '),
(11, 'When was the first Operating System is developed ? ', '1940', '1945', '1950', '1955', 3, 'medium', 'Operating '),
(12, 'What is the meaning of the Booting in Operating System ?', 'Restart the System', 'Install the Program', 'Scanning the System', 'Turning off the System', 1, 'medium', 'Operating '),
(13, 'Which of the following is not a part of the Operating System ?', 'Input Output Control Program', 'Job control program', 'Supervisor', 'Performance Monitor', 4, 'medium', 'Operating '),
(14, 'Which of the following is not an Algorithm of Operating System ?', 'First Come First Serve Algorithm', 'Brute Force Algorithm', 'Round Robin Algorithm', 'Shortest Job First Algorithm', 2, 'medium', 'Operating '),
(15, 'Which of the following is/are Open Source Operating System', 'Linux', 'Windows', 'Both A and B', 'Android', 1, 'medium', 'Operating '),
(16, 'Page fault is what ? ', 'an Error in a specific page', 'an access to a page not currently in a memory', 'a Reference to a page belonging to another program', 'occurs when a program accesses a page of memory', 2, 'medium', 'Operating '),
(17, 'Which one of the following errors will be handle by the operating system?', 'lack of paper in printer', 'connection failure in the network', 'power failure', 'all of the mentioned', 4, 'medium', 'Operating '),
(18, 'If a process fails, most operating system write the error information to a ______', 'new file', 'another running process', 'log file', 'none of the mentioned', 3, 'medium', 'Operating '),
(19, 'FIFO scheduling is a type of:', 'pre-emptive scheduling', 'non pre-emptive scheduling', 'deadline scheduling', 'none of the above', 2, 'medium', 'Operating '),
(20, 'What is the output of the following program?\r\n#include < stdio.h >\r\nmain() {\r\nint a[] = { 10, 20, 30 };\r\nprintf(\" % d \", * a + 1);\r\n}', '10', '20', '11', '21', 3, 'hard', 'Programmin'),
(21, '2.What is the output of the following program?\n#include <stdio.h>\nint main()\n{\nint x = 10, *y, **z;\ny = &x;\nz = &y;\nprintf(\" % d % d % d \", *y, **z, *(*z));\nreturn 0;\n}', '10 10 10', '100xaa54f10', 'Run time error', 'No Output', 1, 'hard', 'Programmin'),
(22, 'What is the output of the following program?\r\n#include<stdio.h>\r\nint main()\r\n{ int a = 1, b = 2, c = 3;\r\nchar d = 0;\r\nif(a,b,c,d)\r\n{\r\nprintf(\"enter in the if\r\n \");\r\n}\r\nelse\r\n{\r\nprintf(\"not entered\r\n \");\r\n}\r\nreturn 0;\r\n\r\n}', 'enter in the if', 'not entered', 'run time error', 'compilation error', 2, 'hard', 'Programmin'),
(23, 'What is the output of the following program?\r\nclass DemoProgram{\r\nstatic float a;\r\npublic static void main(String[]args)\r\nint b;\r\nSystem.out.print(a+b);', '0', 'Variable a might not been initialized', 'Variable b might not been initialized', 'Non static variable accessed in static area', 3, 'hard', 'Programmin'),
(24, 'What is the range of character data type in java ?', '0 to 65535', '-32768 to 32767', '-128 to 127', '0 to 255', 1, 'hard', 'Programmin'),
(25, 'Chief components of First Generation Computer are ?', 'transistors', 'vacum tubes and valvs', 'integrated circuits', 'semiconductors', 2, 'easy', 'Computer B');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `college` text NOT NULL,
  `year` decimal(10,0) NOT NULL,
  `department` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `competition`
--
ALTER TABLE `competition`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `competition`
--
ALTER TABLE `competition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
