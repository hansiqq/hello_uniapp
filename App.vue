<script>
import ala from '@/service/ala'
import api from '@/service/api'
export default {
  beforeCreate() {},
  onLaunch: function() {
    setTimeout(async () => {
      await api.init()
    }, 500)
    // #ifdef APP-PLUS-NVUE
    ala.appUpdate()
    // #endif
  },
  onShow: function() {},
  onHide: function() {}
}
</script>

<style lang="scss">
@import '@/assets/style/index.scss';
</style>
