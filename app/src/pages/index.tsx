"use client"

//sidebar
//navbar
//import all components here
//teacher dashboard
//payments
//teachers
//particular teacher

import { BarChart3, CardSim, Users } from "lucide-react"
import Navigation from "../components/Navigation"
import { useState } from "react"
import { Teachers } from "next/font/google";


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


    const NavigationItem = [
        { id: 'Dashboard', label: "Dashboard", icon:BarChart3},
        { id: 'Teachers', label: "Teachers", icon: Users },
        { id: 'Payment', label: "Payments", icon:CardSim},
    ]

    const mockTeachers:Teachers[] = [
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
            
            <main>
                <header className="">
                <div className="">
                        <input
                            placeholder="Search Teacher name, Subject, or email"
                            onChange={(e)=>setSearch(e.target.value)}
                            value={search}
                        />
                    </div>
                    </header>

            </main>

            <div>
                {activeTab === "Dashboard" && (
                    <TeachersDashboard teachers={filteredTeachers} />
                )}
            </div>
            
        </div>
    )
}