export type AllMeetings = {
    _id: string

groupId: string

groupName: string

    meetings: {
        dateCreated: string

        format: "online" | 'offline'
        
        groupId: string
        
        id: string
        
        meetingId: string
        
        meetingInfo: string
        
        name: string
        
        volunteers: [firstName:string, lastName: string, volunteerId: string]
    }[],

teamLeader: {firstName:string, lastName: string, teamLeaderId: string}
}