import { Volunteer } from "~/types/Volunteers";
const isUpdateVolunteerOpen = ref(false)
const isCreateVolunteerOpen=ref(false)
const currentVolunteer=ref({} as Volunteer)
const toggleUpdateVolunteer = (data: Volunteer) => {
    isUpdateVolunteerOpen.value = true;
    currentVolunteer.value = data
}
const toggleCreateVolunteer = (value: boolean) => {
    isCreateVolunteerOpen.value=value
}
export {toggleUpdateVolunteer,isUpdateVolunteerOpen,currentVolunteer,toggleCreateVolunteer,isCreateVolunteerOpen}