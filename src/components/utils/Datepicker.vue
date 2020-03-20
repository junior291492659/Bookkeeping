<template>
  <div>
    <date-picker v-model="time1" valueType="format"></date-picker>
    <date-picker v-model="time2" type="datetime"></date-picker>
    <date-picker v-model="time3" valueType="format"></date-picker>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import 'vue2-datepicker/locale/zh-cn';
 
  export default {
    components: { DatePicker },
    data() {
      return {
        name: "datePicker",
        time1: null,
        time2: null,
        time3: null,
      };
    },
  };
</script> 