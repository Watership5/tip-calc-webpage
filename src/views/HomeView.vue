<script setup lang="ts">
  import { computed, ref } from 'vue';
  import logo from "../assets/logo.svg"
  import dollar from "../icons/icon-dollar.svg"
  import person from "../icons/icon-person.svg"
  import dollarRed from "../icons/icon-dollar-red.svg"
  import personRed from "../icons/icon-person-red.svg"
  const inputs = [
    {
      id:1,
      label:"Bill",
      imgSrc:dollar,
      altImgSrc:dollarRed,
      MaxLength:"8"
    },
    {
      id:2,
      label:"Number of People",
      imgSrc:person,
      altImgSrc:personRed,
      MaxLength:"3"
    },
  ]
  const btnValues = [
    {
      vpNum: "5%",
      funcNum: 5,
      id:1,
    },
    {
      vpNum: "10%",
      funcNum: 10,
      id:2,
    },
    {
      vpNum: "15%",
      funcNum: 15,
      id:3,
    },
    {
      vpNum: "25%",
      funcNum: 25,
      id:4,
    },
    {
      vpNum: "50%",
      funcNum: 50,
      id:5,
    }
  ]
  const bill = ref()
  const people = ref()
  const tip = ref()
  const tip2 = ref()
  let clickedIndex = ref(null)
  let state = ref(true)
  let state2 = ref(true)
  let state3 = ref(true)
  const setTipValue = (value, index) => {
    tip.value = value;
    clickedIndex.value = index
  };
  const reset = () => {
    tip.value = null
    tip2.value = null
    bill.value = null
    people.value = null
    state.value = true
    state2.value = true
    state3.value = true
    err2.value = ""
    err.value = ""
    clickedIndex.value = null
  }
  const err = ref()
  const err2 = ref()
  const err3 = ref()
  const validation = (index) => {
    if(index == 1){
      if(bill.value == null || bill.value.trim() === ""){
        err.value = "invalid 3"
        state.value = false
      }
      else if(isNaN(bill.value)){
        err.value = "invalid 1"
        state.value = false
      }
      else if(bill.value >= 1001 || bill.value < 1){
        err.value = "invalid 2"
        state.value = false
      }
      else{
        err.value = ""
        state.value = true
      }
    }
    else if(index == 3){
      if(tip2.value == null || tip2.value.trim() === ""){
        err3.value = "invalid 3"
        state3.value = false
      }
      else if(isNaN(tip2.value)){
        err3.value = "invalid 1"
        state3.value = false

      }
      else if(tip2.value >= 51 || tip2.value < 1){
        err3.value = "invalid 2"  
        state3.value = false
      }
      else{
        err3.value = ""
        state3.value = true
      }
    }
    else{
      if(people.value == null || people.value.trim() === ""){
        err2.value = "invalid 3"
        state2.value = false

      }
      else if(isNaN(people.value)){
        err2.value = "invalid 1"
        state2.value = false

      }
      else if(people.value >= 11 || people.value < 1){
        err2.value = "invalid 2"  
        state2.value = false

      }
      else{
        err2.value = ""
        state2.value = true

      }
    }

  }
  const activeTip = computed(() => {
    if(!tip.value){
      return tip2.value
    }
    else if(!tip2.value){
      return tip.value
    }
    return tip2.value == null ? tip.value : tip.value == null ? tip2.value : tip2.value;
  });
  const tipAmountPerPerson = computed(() => {
    if (!bill.value || !people.value || !activeTip.value) {
      return "0.00";
    }
    return Math.round(100 * (bill.value * (activeTip.value / 100)) / people.value) / 100;
  });

  const totalAmountPerPerson = computed(() => {
    if (!bill.value || !people.value || !activeTip.value) {
      return "0.00";
    }
    return (
      Math.round(
        100 *
          ((bill.value / people.value) +
            (bill.value * (activeTip.value / 100)) / people.value)
      ) / 100
    );
  });
  const clss = "uppercase mt-[4rem] hover:bg-light-grayish-cyan text-center rounded-[5px] h-[3rem] bg-strong-cyan text-very-dark-cyan text-[21px] tracking-[1px]"
  const altClss = "uppercase mt-[4rem] text-center rounded-[5px] h-[3rem] bg-strong-cyan text-very-dark-cyan text-[21px] tracking-[1px] opacity-[0.25]"
  const defStyles = 'text-center w-[7.5rem] rounded-[5px] h-[3rem] hover:bg-strong-cyan hover:text-very-dark-cyan text-[24px] tracking-[1px] focus:bg-strong-cyan focus:text-very-dark-cyan'
  const inputClss = "rounded-[5px] outline-none text-[21px] text-very-dark-cyan placeholder:text-right text-right h-[3rem] w-[24.5rem] p-[1rem] border-[.13rem] border-strong-cyan"
  const invalidInputClass = "rounded-[5px] outline-none text-[21px] text-red bg-redT placeholder:text-right placeholder:text-red text-right h-[3rem] w-[24.5rem] p-[1rem] border-[.13rem] border-red"
  const inputClss2 = "rounded-[5px] outline-none text-[21px] text-very-dark-cyan placeholder:text-right text-right h-[3rem] w-[7.5rem] p-[1rem] border-[.13rem] border-strong-cyan"
  const invalidInputClass2 = "rounded-[5px] outline-none text-[21px] text-red bg-redT placeholder:text-right placeholder:text-red text-right h-[3rem] w-[7.5rem] p-[1rem] border-[.13rem] border-red"
</script>

<template>
  <header class="flex items-center justify-center mb-[3rem]">
    <img :src="logo" alt="logo" class=""/>
  </header>
  <main class="bg-white flex items-center justify-center p-[2rem] gap-[3.5rem] rounded-[22.5px]">
    <form class="flex flex-col gap-[2rem]" @submit.prevent>
      <div class="flex flex-col" v-for="input in inputs" :key="input.id">
        <div class="text-dark-grayish-cyan mb-[0.5rem] flex items-center justify-between">
          <span>
            {{ input.label }}
          </span>
          <span v-if="input.id === 1" :class="[state == true ? 'text-transparent' : 'text-red', 'text-[14px]',]">
            {{ err }}
          </span>
          <span v-if="input.id === 2" :class="[state == true ? 'text-transparent' : 'text-red', 'text-[14px]',]">
            {{ err2 }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <img v-if="input.id == 1" :src="state == true ? input.imgSrc : input.altImgSrc" alt="" class="absolute pl-[1rem]"/>
          <img v-if="input.id == 2" :src="state2 == true ? input.imgSrc : input.altImgSrc" alt="" class="absolute pl-[1rem]"/>
          <input type="text" id="input2" placeholder="0" :class="state == true ? inputClss : invalidInputClass" :maxlength="input.MaxLength" v-if="input.id == 1" v-model="bill" @input="validation(input.id)"/>
          <input type="text" id="input3" placeholder="0" :class="state2 == true ? inputClss : invalidInputClass" :maxlength="input.MaxLength" v-else-if="input.id == 2" v-model="people" @input="validation(input.id)"/>
        </div>
        <div v-if="input.id === 1" class="flex flex-col items-start gap-[1rem] mt-[2rem]">
          <label class=" text-dark-grayish-cyan">
            Select Tip %
          </label>
          <div class="grid gap-[1rem] grid-cols-3">
            <button v-for="btn in btnValues" :key="btn.id" :class="[clickedIndex === btn.id ? 'bg-strong-cyan text-very-dark-cyan' : 'bg-very-dark-cyan text-white',defStyles,]" v-on:click="setTipValue(btn.funcNum, btn.id)">
              {{ btn.vpNum }}
            </button>
            <input type="text" id="input" maxlength="2" placeholder="Custom" :class="state3 == true ? inputClss2 : invalidInputClass2" @input="validation(3)" v-model="tip2" @focus="clickedIndex = null"/>
          </div>
        </div>
      </div>
    </form>
    <section class="bg-very-dark-cyan flex flex-col gap-[3rem] p-[2rem] rounded-[15px] w-[27rem]">
      <div class="flex items-center justify-between gap-[5rem]">
        <div>
          <p class="text-white">
            Tip Amount
          </p>
          <p class="text-grayish-cyan text-[14px]">
            / person
          </p>
        </div>
        <h1 class="text-strong-cyan text-[50px]">
          ${{ err != "" || err2 != "" || err3 != "" ? "0.00" : tipAmountPerPerson }}
        </h1>
      </div>
      <div class="flex items-center justify-between gap-[7rem] mt-[-1.5rem]">
        <div>
          <p class="text-white">
            Total
          </p>
          <p class="text-grayish-cyan text-[14px]">
            / person
          </p>
        </div>
        <h1 class="text-strong-cyan text-[50px]">
          ${{ err != "" || err2 != "" || err3 != "" ? "0.00" :  totalAmountPerPerson }}
        </h1>
      </div>
      <button :class="bill || people || tip || err || err2 ? clss : altClss" v-on:click="bill || people || tip || err || err2 ? reset() : null">
        reset
      </button>
    </section>
  </main>
</template>

<style>
  .img{
    height: fit-content;
  }
</style>