<template>
  <div id="app">
    <!-- SideBar Component -->
    <sidebar />
    <div class="main-content">
      <!-- navbar Component -->
      <navbar />
      <!-- Inner content -->
      <router-view />
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Nav";
import { useRouter } from "vue-router";
import { computed, onMounted, watch } from "vue";
import {useStore} from "vuex";


export default {
  name: "Wrapper",
  components: {
    sidebar: Sidebar,
    navbar: Navbar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    
    const user = computed(() => store.state.User.user);
    watch(user,()=>{
      if(user.value.role.name!='super_admin' && user.value.role.name!='computer_operator'){
        router.push('/');
      } 
    })
    
    onMounted(async () => {
      if(user.value.role.name!='super_admin' && user.value.role.name!='computer_operator'){
        try{
          const data = await store.dispatch("Auth/getAuthUser");
          if(!data.role.name)
            router.push('/');
        }
        catch{
          router.push('/');
        }
      } 
    });
    return {};
  },
};
</script>