# Guide to Using Json Data Files

## About
will only ever take the top most json object

**Fields**
- Title (optional): string
- Place (optional): string
- Email (optional): string
- About: string

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
- Class: string
- Year: 
  - Semester: string
  - Year: int

## Service
**Fields**
- Conference: string
- Role: 
  - Year: int[]
  - Role: string

## Publications
**Fields**
- Conference: string
- Year: string 
- Publications:
  - Name: string
  - Description: string
  - Link (optional): string (link to a site) -- this one makes a clickable link