# Guide to Using Json Data Files

## About
will only ever take the top most json object

**Fields**
- Title (optional): string
- Place (optional): string
- Email (optional): string
- About: string -- in about wrap the stuff you want with links in [[]], the first [[]] will get the first link in Links... (DO NOT USE [[]] anywhere else in about)
- Links (optional): string[] links

## Education
**Fields**
- School: string
- Place: string
- Year: int
- Notes: string

## Teaching Blurb
will only ever take the top most json object

**Fields**
- Blurb: string

## Teaching
**Fields**
- Class: string
- Year: 
  - Semester: string
  - Year: int
  - Coteachers (optional):
    - Name: string
    - Link (optional): string (link to a site)
  - Link (optional): string (link to a site)
- Description: string

## TA
**Fields**
- GTA: boolean (true if a GTA position, false if a UTA position)
- Class: string
- Year: 
  - Semester: string
  - Year: int

## Service
**Fields**
- Conference: string
- Description (optional):string
- Role: 
  - Year: int[]
  - Role: string
  - Description (optional): string


## Publications
**Fields**
- Conference: string
- Year: string 
- Publications:
  - Name: string
  - Description: string
  - Link (optional): string (link to a site) -- this one makes a clickable link