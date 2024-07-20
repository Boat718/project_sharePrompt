'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {useState, useEffect} from 'react'
import Profile from '@components/Profile'

const ProfilePage = () => {

    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
        
        if(session?.user.id) {
            fetchPosts();
        }
    
      },[])

    const handleEdit = (post) => {
      console.log(post)
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const hashConfirmed = confirm('Are you sure you want to delete this prompt?')
      if(hashConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE',
          });

          const filteredPost = posts.filter((p) => p._id !== post._id)
          setPosts(filteredPost);
        } catch (error) {
          console.log(error);
        }
        
    }
  }

  return (
    <Profile
        name="My"
        desc="Welcome to your Profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default ProfilePage