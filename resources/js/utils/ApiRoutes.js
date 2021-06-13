// export const BASE_URL = 'http://127.0.0.1:8000/api';
export const BASE_URL = 'http://computerzirna.in/api';

export const FETCH_ADMIN_API='admin/index'
export const CREATE_ADMIN_API='admin/create'
export const UDPATE_ADMIN_API=id=>`admin/${id}`
export const DELETE_ADMIN_API=id=>`admin/${id}`

export const FETCH_COURSE_API='courses/index'
export const CREATE_COURSE_API='courses/create'
export const UDPATE_COURSE_API=id=>`courses/${id}`
export const DELETE_COURSE_API=id=>`courses/${id}`

export const FETCH_VIDEO_API='videos/index'
export const CREATE_VIDEO_API='videos/create'
export const UDPATE_VIDEO_API=id=>`videos/${id}`
export const DELETE_VIDEO_API=id=>`videos/${id}`

export const FETCH_IMAGES_API=`media/index`
export const UPLOAD_IMAGES_API=`media/upload`
export const DELETE_IMAGES_API=id=>`media/${id}`

export const ADMIN_LOGIN_API = `auth/admin/login`;
export const LOGOUT_API = `auth/logout`;

export const FETCH_PUBLICDATA_API='public/data'
