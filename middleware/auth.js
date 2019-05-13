/**
 * Created by Akhtar on  09/05/2019.
 */

export default function (context) {
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/admin/auth')
  }
}
