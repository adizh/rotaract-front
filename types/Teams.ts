import { Volunteer } from "./Volunteers"

export type Team = {
    dateCreated: string
    

    groupId: string

groupName:string

status:string
projectInfo: string
projectName: string
    teamLeader: {
    
teamLeaderId: string

        teamLeaderName: string

}


volunteers:Volunteer[]
}

export const statusOptions = [
    { label: 'Обсуждение', value: '1' },
    { label: 'Поиск спонсоров', value: '2' },
    { label: 'Реализация', value: '3' },
    { label: 'Завершено', value: '4' },
]
