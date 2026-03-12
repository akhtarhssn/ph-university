import mongoose from "mongoose"
import { faker } from "@faker-js/faker"

import { User } from "./app/modules/user/user.model"
import { Student } from "./app/modules/student/student.model"
import { Faculty } from "./app/modules/faculty/faculty.model"
import { Admin } from "./app/modules/Admin/admin.model"
import { CourseModel } from "./app/modules/Course/course.model"
import { AcademicFacultyModel } from "./app/modules/academicFaculty/academicFaculty.model"
import { DepartmentModel } from "./app/modules/department/department.model"
import { SemesterModel } from "./app/modules/academicSemester/academicSemester.model"
import { OfferedCourseModel } from "./app/modules/offeredCourse/offeredCourse.model"

import config from "./app/config"
import { EnrolledCourse } from "./app/modules/EnrolledCourse/enrolledcourse.model"

const MONGO_URI = config.database_URL

const seedDatabase = async () => {

    try {

        await mongoose.connect(MONGO_URI!)

        console.log("MongoDB Connected")

        // clear collections
        await Promise.all([
            User.deleteMany({}),
            Student.deleteMany({}),
            Faculty.deleteMany({}),
            Admin.deleteMany({}),
            CourseModel.deleteMany({}),
            AcademicFacultyModel.deleteMany({}),
            DepartmentModel.deleteMany({}),
            SemesterModel.deleteMany({}),
            OfferedCourseModel.deleteMany({}),
            EnrolledCourse.deleteMany({})
        ])

        console.log("Old data removed")

        // ------------------------------------------------
        // Academic Faculty
        // ------------------------------------------------

        const academicFaculty = await AcademicFacultyModel.create({
            name: "Faculty of Engineering"
        })

        // ------------------------------------------------
        // Department
        // ------------------------------------------------

        const department = await DepartmentModel.create({
            name: "Computer Science and Engineering",
            academicFaculty: academicFaculty._id
        })

        // ------------------------------------------------
        // Semester
        // ------------------------------------------------

        const semester = await SemesterModel.create({
            name: "Autumn",
            code: "01",
            year: "2024",
            startMonth: "September",
            endMonth: "December"
        })

        // ------------------------------------------------
        // Courses (20)
        // ------------------------------------------------

        const courses = []

        for (let i = 1; i <= 20; i++) {

            const course = await CourseModel.create({
                title: `Course ${i}`,
                prefix: "CSE",
                code: 100 + i,
                credits: faker.number.int({ min: 2, max: 4 })
            })

            courses.push(course)
        }

        console.log("Courses created")

        // ------------------------------------------------
        // Admin
        // ------------------------------------------------

        const adminUser = await User.create({
            id: "A-001",
            password: "admin123",
            email: "admin@test.com",
            role: "Admin"
        })

        await Admin.create({
            id: "A-001",
            user: adminUser._id,
            designation: "System Admin",
            name: { firstName: "System", lastName: "Admin" },
            gender: "Male",
            email: "admin@test.com",
            phoneNumber: "01700000000",
            emergencyPhoneNumber: "01700000001",
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

        // ------------------------------------------------
        // Faculties (10)
        // ------------------------------------------------

        const faculties = []

        for (let i = 1; i <= 10; i++) {

            const user = await User.create({
                id: `F-${String(i).padStart(3, "0")}`,
                password: "faculty123",
                email: faker.internet.email(),
                role: "Faculty"
            })

            const faculty = await Faculty.create({

                id: `F-${String(i).padStart(3, "0")}`,
                user: user._id,
                designation: "Lecturer",

                name: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName()
                },

                gender: faker.helpers.arrayElement(["Male", "Female"]),
                email: faker.internet.email(),

                phoneNumber: faker.string.numeric(11),
                emergencyPhoneNumber: faker.string.numeric(11),

                academicDepartment: department._id,

                presentAddress: {
                    street: faker.location.streetAddress(),
                    city: faker.location.city(),
                    postalCode: "1200"
                },

                permanentAddress: {
                    street: faker.location.streetAddress(),
                    city: faker.location.city(),
                    postalCode: "1200"
                }

            })

            faculties.push(faculty)
        }

        console.log("Faculties created")

        // ------------------------------------------------
        // Students (50)
        // ------------------------------------------------

        const students = []

        for (let i = 1; i <= 50; i++) {

            const user = await User.create({

                id: `S-${String(i).padStart(3, "0")}`,
                password: "student123",
                email: faker.internet.email(),
                role: "Student"

            })

            const student = await Student.create({

                id: `S-${String(i).padStart(3, "0")}`,
                userId: user._id,

                name: {
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName()
                },

                gender: faker.helpers.arrayElement(["Male", "Female"]),

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

            students.push(student)
        }

        console.log("Students created")

        // ------------------------------------------------
        // Offered Courses
        // ------------------------------------------------

        const offeredCourses = []

        for (let i = 0; i < courses.length; i++) {

            const faculty = faker.helpers.arrayElement(faculties)

            const DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
            const offered = await OfferedCourseModel.create({

                semesterRegistration: new mongoose.Types.ObjectId(),

                academicSemester: semester._id,
                academicFaculty: academicFaculty._id,
                academicDepartment: department._id,

                course: courses[i]._id,
                faculty: faculty._id,

                maxCapacity: 40,
                section: 1,

                days: faker.helpers.arrayElements(DAYS, 2),

                startTime: "09:00",
                endTime: "10:30"

            })

            offeredCourses.push(offered)
        }

        console.log("Offered courses created")

        // ------------------------------------------------
        // Enroll students randomly
        // ------------------------------------------------

        for (const student of students) {

            const randomCourses =
                faker.helpers.arrayElements(offeredCourses, 3)

            for (const course of randomCourses) {

                await EnrolledCourse.create({

                    semesterRegistration: course.semesterRegistration,

                    academicSemester: semester._id,
                    academicFaculty: academicFaculty._id,
                    academicDepartment: department._id,

                    offeredCourse: course._id,
                    course: course.course,

                    student: student._id,
                    faculty: course.faculty,

                    isEnrolled: true

                })
            }
        }

        console.log("Enrollments created")

        console.log("🎉 DATABASE SEEDED SUCCESSFULLY")

    }
    catch (error) {

        console.error(error)

    }
    finally {

        await mongoose.disconnect()

    }

}

seedDatabase()