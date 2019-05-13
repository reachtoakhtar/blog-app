/**
 * Created by Akhtar on  09/05/2019.
 */

export default function (context) {
  context.store.dispatch('initAuth', context.req)
}
