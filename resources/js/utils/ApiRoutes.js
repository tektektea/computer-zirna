// export const BASE_URL = 'http://127.0.0.1:8000/api';
export const BASE_URL = 'https://computerzirna.in/api';

export const FETCH_ADMIN_API='admin/index'
export const CREATE_ADMIN_API='admin/create'
export const UDPATE_ADMIN_API=id=>`admin/${id}`
export const DELETE_ADMIN_API=id=>`admin/${id}`

export const FETCH_CONTACT_API=`contacts/index`
export const DELETE_CONTACT_API=id=>`contacts/${id}`

export const FETCH_COURSE_API='courses/index'
export const SHOW_COURSE_API=id=>`courses/${id}/show`
export const CREATE_COURSE_API='courses/create'
export const UDPATE_COURSE_API=id=>`courses/${id}`
export const DELETE_COURSE_API=id=>`courses/${id}`

export const FETCH_SUBJECTS_API='subjects/index'
export const GET_SUBJECTS_API='subjects/all'
export const SHOW_SUBJECTS_API=id=>`subjects/${id}/show`
export const CREATE_SUBJECTS_API='subjects/create'
export const UPDATE_SUBJECTS_API=id=>`subjects/${id}`
export const DELETE_SUBJECT_API=id=>`subjects/${id}`

export const GET_VIDEO_API='videos/all'
export const FETCH_VIDEO_API='videos/index'
export const CREATE_VIDEO_API='videos/create'
export const UPDATE_VIDEO_API=id=>`videos/${id}`
export const DELETE_VIDEO_API=id=>`videos/${id}`

export const GET_MATERIAL_API='material/all'
export const FETCH_MATERIAL_API='material/index'
export const CREATE_MATERIAL_API='material/create'
export const UPDATE_MATERIAL_API=id=>`material/${id}`
export const DELETE_MATERIAL_API=id=>`material/${id}`
export const DOWNLOAD_MATERIAL_API=id=>`material/${id}`

export const FETCH_SUBSCRIPTION_API='subscription/index'
export const CREATE_SUBSCRIPTION_API='subscription/create'
export const RENEW_SUBSCRIPTION_API=id=>`subscription/${id}/renew`
export const BLOCK_SUBSCRIPTION_API=id=>`subscription/${id}/block`
export const UNBLOCK_SUBSCRIPTION_API=id=>`subscription/${id}/unblock`
export const CREATE_SUBSCRIBER_API='subscription/subscriber/create'
export const DELETE_SUBSCRIPTION_API=id=>`subscription/${id}`

export const FETCH_IMAGES_API=`media/index`
export const UPLOAD_IMAGES_API=`media/upload`
export const DELETE_IMAGES_API=id=>`media/${id}`

export const ADMIN_LOGIN_API = `auth/admin/login`;
export const LOGOUT_API = `auth/logout`;

export const FETCH_PUBLICDATA_API='public/data'
export const CHANGE_COROUSEL_API = 'setting/corousel/change';
