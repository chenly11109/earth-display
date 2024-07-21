export type Decision = {
    decisionId: string
    type: 'Equal' | 'Custom' | 'Shareholding',
    members: {
        userName: string
        percent?: number
    }[]
    title: string
    assetType?: string

}
export type Member_abandoned = {
    userId: string
    userName: string
    avatar: string
    positions?: string[]
}
export type Authority = {
    name: string
    data?: {
        type: 'position' | 'workflow',
        authorizer: string[] | Decision[]
    }
    isPublic?: boolean
}

export type Position = {
  positionName: string
  color: string
  organizationId: string
  positionId: string
  members: [
    {
      userName: string
      userId: string
      logo: string
      positionId?: string
    }
  ]
}

export type Member = {
  logo: string
  positionId?: string
  userId: string
  userName: string
}

export type UnitStep = 'fillName' | 'uploadLogo' | 'releaseAmount' | 'addProperty'
  | 'confirmation' | 'pay'

export type PayState = 'pending' | 'success' | 'failure'