"use client"

//sidebar
//navbar
//import all components here
//teacher dashboard
//payments
//teachers
//particular teacher

import { BarChart3, CardSim, Search, Users } from "lucide-react"
import Navigation from "../components/Navigation"
import { useState } from "react"
import { Teachers } from "next/font/google";
import TeachersDashboard from "../components/TeacherDashboard";
import AddTeacherModel from "../components/AddTeacherModel";


export interface Teachers {

    id: String;
    name: String;
    email: String,
    subject: String,
    grade: String,
    experience: Number,
    status: 'active' | 'on-leave' | 'inactive';
    classes: String[],
    performance: {
        rating: Number,
        studentsCount: Number,
        attendance: Number
    }

}



export default function Index() {

    const [activeTab, setActiveTab] = useState("Dashboard");
    const [search, setSearch] = useState("");

    const [isAddModelOpen, setIsAddModelOpen] = useState(false);

    const NavigationItem = [
        { id: 'Dashboard', label: "Dashboard", icon: BarChart3 },
        { id: 'Teachers', label: "Teachers", icon: Users },
        { id: 'Payment', label: "Payments", icon: CardSim },
    ]

    const mockTeachers: Teachers[] = [
        {
            id: '1',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@school.edu',
            subject: 'Mathematics',
            grade: '9-12',
            experience: 8,
            status: 'active',
            classes: ['Algebra II', 'Calculus', 'Statistics'],
            performance: {
                rating: 4.8,
                studentsCount: 145,
                attendance: 96
            }
        },
        {
            id: '2',
            name: 'Michael Chen',
            email: 'michael.chen@school.edu',
            subject: 'Science',
            grade: '6-8',
            experience: 12,
            status: 'active',
            classes: ['Biology', 'Chemistry', 'Physics'],
            performance: {
                rating: 4.9,
                studentsCount: 120,
                attendance: 98
            }
        },
        {
            id: '3',
            name: 'Emily Rodriguez',
            email: 'emily.rodriguez@school.edu',
            subject: 'English',
            grade: '9-11',
            experience: 6,
            status: 'on-leave',
            classes: ['Literature', 'Creative Writing'],
            performance: {
                rating: 4.7,
                studentsCount: 95,
                attendance: 94
            }
        }
    ]

    const [teachers, setTeachers] = useState<Teachers[]>(mockTeachers); 
    
    const handleAddTeacher = (newTeacher:Teachers) => {
        const teacher: Teachers = {
            ...newTeacher,
            id: Date.now().toString()
    }
        setTeachers(prev => [...prev, teacher]);
        setIsAddModelOpen(false);
    }

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(search.toLowerCase()) ||
        teacher.email.toLowerCase().includes(search.toLowerCase())
    )



    return (
        <div className="">
            <div className="flex">
                <Navigation
                    items={NavigationItem}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>

            <main className="flex-1 lg:ml-64">
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
                    <div className="px-4 py-2">
                    <div className="flex justify-between items-center">
                    <div className="flex-1 max-w-2xl">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"/>
                            <input
                                placeholder="Search Teacher name, Subject, or email"
                                onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-200"
                            />

                        </div>
                        </div>
                            <button
                                onClick={()=>setIsAddModelOpen(true)}
                                className="ml-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">Add Teacher +</button>
                        </div>
                        </div>
                </header>

            </main>

            <div>
                {activeTab === "Dashboard" && (
                    <TeachersDashboard teachers={filteredTeachers} />
                )}
            </div>

            <AddTeacherModel
                isOpen={isAddModelOpen}
                onClose={setIsAddModelOpen(false)}
                onSubmit={handleAddTeacher}
            
            />

        </div>
    )
}