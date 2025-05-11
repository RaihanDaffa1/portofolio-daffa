import { supabase } from '../lib/supabase'

// CREATE
export async function addAbout(newAbout) {
const { data, error } = await supabase
.from('about')
.insert([newAbout])

if (error) throw error
return data
}

// READ
export async function fetchAbouts() {
const { data, error } = await supabase
.from('about')
.select('*')
.order('created_at', { ascending: false })

if (error) throw error
return data
}

// UPDATE
export async function updateAbout(id, updatedAbout) {
const { data, error } = await supabase
.from('about')
.update(updatedAbout)
.eq('id', id)

if (error) throw error
return data
}

// DELETE
export async function deleteAbout(id) {
const { data, error } = await supabase
.from('about')
.delete()
.eq('id', id)

if (error) throw error
return data
}
