export const DEPARTMENTS = [
  "English",
  "Physics",
  "Chemistry",
  "Engineering Mathematics",
  "Compiler Design",
  "Computer Networks",
  "Theory of Computation",
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Computer Graphics",
  "Database Management Systems",
  "Operating Systems",
  "Data Structures and Algorithms",
  "Programming Languages",
  "Software Engineering",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
];

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({
  label: department,
  value: department,
}));

export interface Subject {
  id: string;
  courseCode: string;
  name: string;
  department: string;
  description: string;
}

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "1",
    courseCode: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description: "Fundamental concepts of programming and computer science."
  },
  {
    id: "2",
    courseCode: "MATH201",
    name: "Engineering Mathematics",
    department: "Engineering Mathematics",
    description: "Advanced calculus and linear algebra for engineering applications."
  },
  {
    id: "3",
    courseCode: "CS305",
    name: "Database Management Systems",
    department: "Database Management Systems",
    description: "Concepts and principles of database management systems, relational models, and SQL."
  },
  {
    id: "4",
    courseCode: "ENG102",
    name: "Technical Communication",
    department: "English",
    description: "Developing effective writing and communication skills for technical fields."
  },
  {
    id: "5",
    courseCode: "CS410",
    name: "Artificial Intelligence",
    department: "Artificial Intelligence",
    description: "Introduction to AI concepts, problem-solving, search algorithms, and machine learning basics."
  },
  {
    id: "6",
    courseCode: "CS301",
    name: "Operating Systems",
    department: "Operating Systems",
    description: "Principles of operating systems including processes, memory management, and file systems."
  }
];
