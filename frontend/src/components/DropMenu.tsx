import {  MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom'
import {  useRecoilValue } from 'recoil'
import { userState } from '../store/UserState'
import { useInitializerUser, useSignout} from '../hooks/Auth'


function classNames(...classes : string[]) {
  return classes.filter(Boolean).join(' ')
}



export const  DropMenu = ()=> {

  useInitializerUser()

  const user = useRecoilValue(userState)
  const signout = useSignout()


  if(!user) {
    return <div></div>; 
  }

 

  return (
  
      

      <MenuItems
        transition
        className="absolute top-16 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            {({ focus }) => (
             <Link
             to = {""}
             className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
           >
            Your Mail id : {user.email}
           </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <Link
                to = {"/dashboard"}
                className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
              >
               Profile
              </Link>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
             <Link
             to = {"/dashboard"}
             className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
           >
           My Blogs
           </Link>
            )}
          </MenuItem>
         
    
            <MenuItem>
              {({ focus }) => (
                <button
                onClick={signout}
                  className={classNames(
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm',
                  )}
                >
                  Sign out
                </button>
              )}
            </MenuItem>
      
        </div>
      </MenuItems>

  )
}