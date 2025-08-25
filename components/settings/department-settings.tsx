"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserPlus, Settings, Crown } from "lucide-react"

interface DepartmentSettingsProps {
  user: any
}

export function DepartmentSettings({ user }: DepartmentSettingsProps) {
  const [departmentName, setDepartmentName] = useState(user.department)
  const [isLoading, setIsLoading] = useState(false)

  // Mock department members data
  const [members] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-06-15",
      lastActive: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Member",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-08-20",
      lastActive: "2024-01-14T16:45:00Z",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "Member",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-09-10",
      lastActive: "2024-01-13T09:20:00Z",
    },
  ])

  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")

  const handleSaveDepartment = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleInviteMember = () => {
    if (inviteEmail) {
      console.log("Inviting member:", inviteEmail, inviteRole)
      setInviteEmail("")
      setInviteRole("member")
    }
  }

  const handleRemoveMember = (memberId: string) => {
    console.log("Removing member:", memberId)
  }

  const handleChangeRole = (memberId: string, newRole: string) => {
    console.log("Changing role:", memberId, newRole)
  }

  return (
    <div className="space-y-6">
      {/* Department Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Department Information</span>
          </CardTitle>
          <CardDescription>Manage your department settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="departmentName">Department Name</Label>
            <Input id="departmentName" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold">{members.length}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">Documents</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">2.4 GB</p>
              <p className="text-sm text-muted-foreground">Storage Used</p>
            </div>
          </div>

          <Button onClick={handleSaveDepartment} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Invite Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserPlus className="h-5 w-5" />
            <span>Invite Members</span>
          </CardTitle>
          <CardDescription>Add new members to your department</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="inviteEmail">Email Address</Label>
              <Input
                id="inviteEmail"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inviteRole">Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleInviteMember} disabled={!inviteEmail}>
            Send Invitation
          </Button>
        </CardContent>
      </Card>

      {/* Department Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Department Members</span>
          </CardTitle>
          <CardDescription>Manage your team members and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{member.name}</p>
                      {member.role === "Admin" && <Crown className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {new Date(member.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant={member.role === "Admin" ? "default" : "secondary"}>{member.role}</Badge>
                  {member.id !== user.id && (
                    <>
                      <Select
                        value={member.role.toLowerCase()}
                        onValueChange={(value) => handleChangeRole(member.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
