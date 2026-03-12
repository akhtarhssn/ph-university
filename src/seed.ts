import mongoose from "mongoose"
import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

// import User from "./app/modules/user/user.model"
import { User } from "./app/modules/user/user.model"
import { Student } from "./app/modules/student/student.model"
import { Faculty } from "./app/modules/faculty/faculty.model"
import { Admin } from "./app/modules/Admin/admin.model"
import { CourseModel } from "./app/modules/Course/course.model"
import { AcademicFacultyModel } from "./app/modules/academicFaculty/academicFaculty.model"
import { DepartmentModel } from "./app/modules/department/department.model"
import { SemesterModel } from "./app/modules/academicSemester/academicSemester.model"
import config from "./app/config"

const MONGO_URI = config.database_URL

const seedDatabase = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined")
        }

        await mongoose.connect(MONGO_URI)

        console.log("MongoDB Connected")

        // clear collections
        await User.deleteMany({})
        await Student.deleteMany({})
        await Faculty.deleteMany({})
        await Admin.deleteMany({})
        await AcademicFacultyModel.deleteMany({})
        await DepartmentModel.deleteMany({})
        await SemesterModel.deleteMany({})
        await CourseModel.deleteMany({})

        console.log("Old data removed")

        // Academic Faculty
        const academicFaculty = await AcademicFacultyModel.create({
            name: "Faculty of Engineering"
        })

        // Department
        const department = await DepartmentModel.create({
            name: "Computer Science and Engineering",
            academicFaculty: academicFaculty._id
        })

        // Semester
        const semester = await SemesterModel.create({
            name: "Autumn",
            code: "01",
            year: "2024",
            startMonth: "September",
            endMonth: "December"
        })

        // Courses
        const course1 = await CourseModel.create({
            title: "Introduction to Programming",
            prefix: "CSE",
            code: 101,
            credits: 3
        })

        await CourseModel.create({
            title: "Data Structures",
            prefix: "CSE",
            code: 201,
            credits: 3,
            preRequisiteCourses: [
                { course: course1._id }
            ]
        })

        const hashedPassword = await bcrypt.hash("admin123", 10)
        // Admin User
        const adminUser = await User.create({
            id: "A-001",
            password: hashedPassword,
            email: "admin@test.com",
            role: "Admin"
        })

        await Admin.create({
            id: "A-001",
            user: adminUser._id,
            designation: "System Administrator",
            name: {
                firstName: "System",
                lastName: "Admin"
            },
            gender: "Male",
            email: "admin@test.com",
            phoneNumber: "0123456789",
            emergencyPhoneNumber: "0123456789",
            presentAddress: {
                street: "Admin Street",
                city: "Dhaka",
                postalCode: "1200"
            },
            permanentAddress: {
                street: "Admin Street",
                city: "Dhaka",
                postalCode: "1200"
            }
        })

        // Faculty
        const facultyUser = await User.create({
            id: "F-001",
            password: "faculty123",
            email: "faculty@test.com",
            role: "Faculty"
        })

        await Faculty.create({
            id: "F-001",
            user: facultyUser._id,
            designation: "Lecturer",
            name: {
                firstName: "Alice",
                lastName: "Smith"
            },
            gender: "Female",
            email: "faculty@test.com",
            phoneNumber: "0123456789",
            emergencyPhoneNumber: "0123456789",
            academicDepartment: department._id,
            presentAddress: {
                street: "Faculty Street",
                city: "Dhaka",
                postalCode: "1200"
            },
            permanentAddress: {
                street: "Faculty Street",
                city: "Dhaka",
                postalCode: "1200"
            }
        })

        // Generate Students
        for (let i = 1; i <= 10; i++) {

            const user = await User.create({
                id: `S-${String(i).padStart(3, "0")}`,
                password: "student123",
                email: faker.internet.email(),
                role: "Student"
            })

            await Student.create({
                id: `S-${String(i).padStart(3, "0")}`,
                userId: user._id,
                name: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName()
                },
                gender: "Male",
                email: faker.internet.email(),
                phoneNumber: faker.string.numeric(11),
                emergencyPhoneNumber: faker.string.numeric(11),
                presentAddress: {
                    street: faker.location.streetAddress(),
                    city: faker.location.city(),
                    postalCode: "1200"
                },
                permanentAddress: {
                    street: faker.location.streetAddress(),
                    city: faker.location.city(),
                    postalCode: "1200"
                },
                guardian: {
                    fatherName: faker.person.fullName(),
                    fatherOccupation: "Business",
                    fatherPhone: faker.string.numeric(11),
                    motherName: faker.person.fullName(),
                    motherOccupation: "Teacher",
                    motherPhone: faker.string.numeric(11)
                },
                localGuardian: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    phone: faker.string.numeric(11),
                    occupation: "Engineer",
                    address: {
                        street: faker.location.streetAddress(),
                        city: faker.location.city(),
                        postalCode: "1200"
                    }
                },
                academicDepartment: department._id,
                admissionSemester: semester._id
            })
        }

        console.log("Seed data inserted successfully")

    } catch (error) {
        console.error(error)
    } finally {
        await mongoose.disconnect()
    }
}

seedDatabase()