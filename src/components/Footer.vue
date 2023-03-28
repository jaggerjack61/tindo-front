<template>
  <div>
    <footer id="footer">
      <div class="footer-top">
        <div class="container">

        </div>
      </div>

      <div class="container">
        <div class="copyright">
          &copy; Copyright {{year}}<strong> Tendai Jarayi</strong>. All Rights Reserved
        </div>
        <div class="credits">
          Developed by <a href="https://softdev.co.zw/">SoftDev</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>



export default {
  name: 'Footer',
  data(){
    return {
      year:null
    }
  },
  mounted() {
    let currDate = new Date();
    this.year = currDate.getFullYear();
  },
  methods:{
    scrollMeTo(refName) {

      var element = this.$els[refName];
      element.scrollIntoView();

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

