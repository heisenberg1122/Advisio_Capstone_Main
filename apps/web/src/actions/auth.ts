"use server";

export interface LoginResult {
  success: boolean;
  error?: string;
  user?: {
    email: string;
    role: "student" | "adviser" | "professor" | "panelist" | "admin" | "system_admin";
    name: string;
    status: "active" | "pending" | "inactive" | "suspended";
  };
}

const MOCK_USERS = [
  {
    id: "u1",
    name: "Juan Reyes",
    email: "student01@university.edu.ph",
    password: "password123",
    role: "student",
    status: "active",
  },
  {
    id: "u2",
    name: "Dr. Rachel Lim",
    email: "adviser01@university.edu.ph",
    password: "password123",
    role: "adviser",
    status: "active",
  },
  {
    id: "u3",
    name: "Prof. Arthur Pendleton",
    email: "professor01@university.edu.ph",
    password: "password123",
    role: "professor",
    status: "active",
  },
  {
    id: "u4",
    name: "Dr. Lisa Wong",
    email: "panelist01@university.edu.ph",
    password: "password123",
    role: "panelist",
    status: "active",
  },
  {
    id: "u5",
    name: "Admin User",
    email: "admin01@university.edu.ph",
    password: "password123",
    role: "admin",
    status: "active",
  },
  {
    id: "u6",
    name: "System Super Admin",
    email: "superadmin01@university.edu.ph",
    password: "password123",
    role: "system_admin",
    status: "active",
  },
  {
    id: "u7",
    name: "Pending Account Student",
    email: "pending@university.edu.ph",
    password: "password123",
    role: "student",
    status: "pending",
  },
  {
    id: "u8",
    name: "Inactive Account User",
    email: "inactive@university.edu.ph",
    password: "password123",
    role: "student",
    status: "inactive",
  },
  {
    id: "u9",
    name: "Suspended Account User",
    email: "suspended@university.edu.ph",
    password: "password123",
    role: "student",
    status: "suspended",
  },
  {
    id: "u10",
    name: "No Role User",
    email: "norole@university.edu.ph",
    password: "password123",
    role: "", // empty role
    status: "active",
  },
];

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password?: string;
}): Promise<LoginResult> {
  // Simulate database network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const trimmedEmail = email?.trim();
  const rawPassword = password;

  if (!trimmedEmail || !rawPassword) {
    return {
      success: false,
      error: "Email and password are required.",
    };
  }

  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === trimmedEmail.toLowerCase()
  );

  if (!user || user.password !== rawPassword) {
    return {
      success: false,
      error: "Invalid email or password.",
    };
  }

  // Check account status and return specific error messages
  if (user.status === "pending") {
    return {
      success: false,
      error: "Your account is still pending administrator approval.",
    };
  }

  if (user.status === "inactive") {
    return {
      success: false,
      error: "Please activate your account first.",
    };
  }

  if (user.status === "suspended") {
    return {
      success: false,
      error: "Your account has been suspended. Please contact the system administrator.",
    };
  }

  if (user.status !== "active") {
    return {
      success: false,
      error: "Invalid account status. Please contact the administrator.",
    };
  }

  const validRoles = ["student", "adviser", "professor", "panelist", "admin", "system_admin"];
  if (!user.role || !validRoles.includes(user.role)) {
    return {
      success: false,
      error: "No dashboard assigned to this account.",
    };
  }

  return {
    success: true,
    user: {
      email: user.email,
      role: user.role as "student" | "adviser" | "professor" | "panelist" | "admin" | "system_admin",
      name: user.name,
      status: user.status as "active" | "pending" | "inactive" | "suspended",
    },
  };
}
