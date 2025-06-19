export type ActivityModel = {
  id: string
  createdAt: string
  updatedAt: string

  activityDate: string
  activityType: string
  note: string

  applicationId: string
}

export type Activity = {
  id: string
  createdAt: Date
  updatedAt: Date

  activityDate: Date
  activityType: string
  note: string

  applicationId: string
}

export type CreateActivityDto = {
  applicationId: string
  activityDate: Date
  activityType: string
  activityDetails: string
}
