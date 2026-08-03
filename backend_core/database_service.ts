import fs from "fs";
import path from "path";

export interface StudentRecord {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  department: string;
  registeredAt: string;
  geofenceVerified: boolean;
  strikeCount: number;
  password?: string;
  passwordResetToken?: string;
  resetTokenExpiresAt?: string;
  isPermanentMember?: boolean;
}

export interface FacultyRecord {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  department: string;
  assignedExams: string[];
}

export interface AdminRecord {
  id: string;
  username: string;
  email: string;
  role: "super_admin" | "dean" | "exam_controller";
}

export interface ExamRecord {
  id: string;
  examCode: string;
  title: string;
  department: string;
  startTimeIso: string;
  endTimeIso: string;
  totalQuestions: number;
  totalMarks: number;
  geofenceMaxRadiusMeters: number;
}

export interface SubmissionRecord {
  submissionId: string;
  examId: string;
  studentRollNo: string;
  studentEmail: string;
  score: number;
  totalMarks: number;
  userLat: number;
  userLon: number;
  distanceMeters: number;
  submittedAt: string;
  verified: boolean;
  marksheetDispatched: boolean;
}

export interface InstituteRecord {
  id: string;
  code: string;
  name: string;
  aliases: string[];
  city: string;
  state: string;
  verified: boolean;
  geofenceCenterLat: number;
  geofenceCenterLon: number;
  geofenceRadiusMeters: number;
  logoUrl?: string;
}

export interface DatabaseState {
  institutes: InstituteRecord[];
  students: StudentRecord[];
  faculty: FacultyRecord[];
  admins: AdminRecord[];
  exams: ExamRecord[];
  submissions: SubmissionRecord[];
}

const DB_FILE_PATH = path.join(process.cwd(), "backend_core", "data", "database_store.json");

// Initial Seed Data
const initialDbState: DatabaseState = {
  institutes: [
    {
      id: "inst-001",
      code: "LIET",
      name: "Lords Institute of Engineering and Technology",
      aliases: [
        "lords",
        "lords institute",
        "liet",
        "lords institute of engineering",
        "lords institute of engineering & technology",
        "lords institute of engineering and technology"
      ],
      city: "Hyderabad",
      state: "Telangana",
      verified: true,
      geofenceCenterLat: 17.385044,
      geofenceCenterLon: 78.486671,
      geofenceRadiusMeters: 200,
      logoUrl: "/lords_crest_logo.png",
    },
  ],
  students: [
    {
      id: "std-001",
      rollNo: "21LIETCS301",
      name: "Student Alpha",
      email: "legezt@gmail.com", // Configured with user email
      department: "CSE",
      registeredAt: new Date().toISOString(),
      geofenceVerified: true,
      strikeCount: 0,
    },
    {
      id: "std-002",
      rollNo: "21LIETCS302",
      name: "Student Beta",
      email: "student.beta@liet.ac.in",
      department: "CSE",
      registeredAt: new Date().toISOString(),
      geofenceVerified: false,
      strikeCount: 1,
    },
  ],
  faculty: [
    {
      id: "fac-101",
      facultyId: "FAC-CS-01",
      name: "Dr. K. Sharma",
      email: "legezt@gmail.com",
      department: "CSE",
      assignedExams: ["EX-CS302"],
    },
  ],
  admins: [
    {
      id: "adm-001",
      username: "admin_jibran",
      email: "legezt@gmail.com",
      role: "super_admin",
    },
  ],
  exams: [
    {
      id: "EX-CS302",
      examCode: "CS-302",
      title: "Data Structures & Algorithms Final",
      department: "CSE",
      startTimeIso: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // Live now
      endTimeIso: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Ends in 60 mins
      totalQuestions: 25,
      totalMarks: 100,
      geofenceMaxRadiusMeters: 200,
    },
  ],
  submissions: [],
};

class DatabaseService {
  private db: DatabaseState;

  constructor() {
    this.db = this.loadDatabase();
  }

  private loadDatabase(): DatabaseState {
    try {
      const dataDir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      if (fs.existsSync(DB_FILE_PATH)) {
        const fileContent = fs.readFileSync(DB_FILE_PATH, "utf-8");
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn("Could not load db file, initializing with seed data:", err);
    }
    this.saveDatabase(initialDbState);
    return initialDbState;
  }

  private saveDatabase(state: DatabaseState) {
    try {
      const dataDir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to write database store file:", err);
    }
  }

  public getDatabase(): DatabaseState {
    return this.db;
  }

  public getAllInstitutes(): InstituteRecord[] {
    return this.db.institutes || initialDbState.institutes;
  }

  public findInstituteByQuery(query: string): InstituteRecord | undefined {
    if (!query) return undefined;
    const q = query.trim().toLowerCase();
    const institutes = this.getAllInstitutes();
    return institutes.find(
      (inst) =>
        inst.name.toLowerCase().includes(q) ||
        inst.code.toLowerCase() === q ||
        inst.aliases.some((alias) => alias.toLowerCase().includes(q) || q.includes(alias.toLowerCase()))
    );
  }

  public findStudentByEmailOrRoll(query: string): StudentRecord | undefined {
    const q = query.trim().toLowerCase();
    return this.db.students.find(
      (s) => s.email.toLowerCase() === q || s.rollNo.toLowerCase() === q
    );
  }

  public findFacultyByEmailOrId(query: string): FacultyRecord | undefined {
    const q = query.trim().toLowerCase();
    return this.db.faculty.find(
      (f) => f.email.toLowerCase() === q || f.facultyId.toLowerCase() === q
    );
  }

  public findExamById(examId: string): ExamRecord | undefined {
    return this.db.exams.find((e) => e.id === examId || e.examCode === examId);
  }

  public registerStudent(studentData: Omit<StudentRecord, "id" | "registeredAt" | "geofenceVerified" | "strikeCount">): StudentRecord {
    const existing = this.findStudentByEmailOrRoll(studentData.email) || this.findStudentByEmailOrRoll(studentData.rollNo);
    if (existing) {
      return existing;
    }

    const newStudent: StudentRecord = {
      id: `std-${Date.now().toString().slice(-4)}`,
      ...studentData,
      registeredAt: new Date().toISOString(),
      geofenceVerified: true,
      strikeCount: 0,
    };

    this.db.students.push(newStudent);
    this.saveDatabase(this.db);
    return newStudent;
  }

  public verifyPermanentMember(emailOrRoll: string): StudentRecord | undefined {
    const student = this.findStudentByEmailOrRoll(emailOrRoll);
    if (student) {
      student.isPermanentMember = true;
      this.saveDatabase(this.db);
    }
    return student;
  }

  public createPasswordResetToken(emailOrRoll: string): { success: boolean; token?: string; email?: string; message: string } {
    const student = this.findStudentByEmailOrRoll(emailOrRoll);
    if (!student) {
      return { success: false, message: "No student account found for this Roll No / Email." };
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    student.passwordResetToken = token;
    student.resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins
    this.saveDatabase(this.db);

    return {
      success: true,
      token,
      email: student.email,
      message: `Password reset token generated for ${student.name}. Token dispatched to ${student.email}.`,
    };
  }

  public confirmPasswordReset(emailOrRoll: string, token: string, newPassword: string): { success: boolean; message: string } {
    const student = this.findStudentByEmailOrRoll(emailOrRoll);
    if (!student) {
      return { success: false, message: "Student account not found." };
    }

    if (!student.passwordResetToken || student.passwordResetToken !== token.trim()) {
      return { success: false, message: "Invalid 6-digit password reset token." };
    }

    if (student.resetTokenExpiresAt && new Date(student.resetTokenExpiresAt) < new Date()) {
      return { success: false, message: "Password reset token has expired. Please request a new token." };
    }

    student.password = newPassword.trim();
    student.passwordResetToken = undefined;
    student.resetTokenExpiresAt = undefined;
    this.saveDatabase(this.db);

    return { success: true, message: `Password updated successfully for ${student.name}! Please login with your new password.` };
  }

  public addSubmission(submission: SubmissionRecord) {
    this.db.submissions.push(submission);
    this.saveDatabase(this.db);
  }
}

export const dbService = new DatabaseService();
