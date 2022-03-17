<template>
  <!--Change class to alert-danger for wrong input alert  -->
  <div  :class="['d-flex align-items-center flex-wrap alert', name == 'danger' ? 'alert-danger' : 'alert-success']" v-if="alertTime == true">
    <div class="alert-content pe-3 ps-4 position-relative">
      <h5  class="mb-0 text-truncate">{{alertHeading}}</h5>
      <p class="mb-0 text-truncate">{{alertDescription}}</p>
    </div>
    <div class="alert-small-box d-flex align-items-center justify-content-center text-center rounded-circle">
      <span class="d-inline-block"></span>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';
import '@/assets/scss/components/_alert.scss';
export default {
  props: {
    alertHeading: String,
    name: String,
    alertDescription: String
  },
  //props:['name', 'alertHeading', 'alertDescription'],
  setup(props) {
    const alertTime = ref(true);
    

    const alertFunction= () => {
      setTimeout(function() {
        alertTime.value = false;
      }, 1000)
    }







    return {
      alertTime,
      alertFunction
    }
  }
}
</script>