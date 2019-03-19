import { mapActions } from 'vuex'

export const authMethods = mapActions('auth', [
  'testCall',
  'oauth',
  'authorization',
  'token',
])
