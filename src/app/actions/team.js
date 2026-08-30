// app/actions/team.js
'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/mongoose'
import TeamMember from '@/models/TeamMember'
import { isAdminAuthenticated } from '@/app/actions/admin'
import { uploadImage } from '@/lib/cloudinary'

export async function getTeamMembers() {
  try {
    await connectToDatabase()
    const members = await TeamMember.find({}).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(members))
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function saveTeamMember(formData) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { error: 'Unauthorized action.' }

  try {
    await connectToDatabase()

    const id = formData.get('id')
    const name = formData.get('name')
    const role = formData.get('role')
    const facebook = formData.get('facebook') || '#'
    const twitter = formData.get('twitter') || '#'
    const instagram = formData.get('instagram') || '#'
    const imageFile = formData.get('imageFile')

    let imageUrl = formData.get('existingImage') || ''

    // Edge-compatible image upload buffer conversion
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      // Use Uint8Array instead of Node's global Buffer for Edge runtime compatibility
      const buffer = Uint8Array.from(new Uint8Array(arrayBuffer))

      imageUrl = await uploadImage(buffer, 'team_members')
    }

    if (!imageUrl) {
      return { error: 'Please upload an image.' }
    }

    const memberData = {
      name,
      role,
      image: imageUrl,
      socials: { facebook, twitter, instagram },
    }

    if (id) {
      await TeamMember.findByIdAndUpdate(id, memberData, { new: true }).lean()
    } else {
      await TeamMember.create(memberData)
    }

    // Revalidate paths
    revalidatePath('/team')
    revalidatePath('/admin/team')

    // Always return a explicit, plain JSON object
    return { success: true, error: null }
  } catch (error) {
    console.error('Error saving team member:', error?.message || error)
    return { success: false, error: error?.message || 'Failed to save team member.' }
  }
}

export async function deleteTeamMember(id) {
  const isAuth = await isAdminAuthenticated()
  if (!isAuth) return { error: 'Unauthorized action.' }

  try {
    await connectToDatabase()
    await TeamMember.findByIdAndDelete(id)

    revalidatePath('/team')
    revalidatePath('/admin/team')

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting member:', error?.message || error)
    return { success: false, error: 'Failed to delete team member.' }
  }
}