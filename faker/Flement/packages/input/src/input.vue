<template>
  <div
    :class="[
      type === 'textarea' ? 'fa-textarea' : 'fa-input',
      inputSize ? 'fa-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'fa-input-group': $slots.prepend || $slots.append,
        'fa-input-group--append': $slots.append,
        'fa-input-group--prepend': $slots.prepend,
        'fa-input--prefix': $slots.prefix || prefixIcon,
        'fa-input--suffix':
          $slots.suffix || suffixIcon || clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="fa-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabIndex"
        v-if="type !== 'textarea'"
        class="fa-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      />
      <!-- 前置内容 -->
      <span class="fa-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="fa-input__icon" v-if="prefixIcon" :class="prefixIcon"></i>
      </span>
      <!-- 后置内容 -->
      <span class="fa-input__suffix" v-if="getSuffixVisible()">
        <span class="fa-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="fa-input__icon" v-if="suffixIcon" :class="suffixIcon"></i>
          </template>
          <i
            v-if="showClear"
            class="fa-input__icon fa-icon-circle-close fa-input__clear"
            @mousedown.prevent
            @click="clear"
          ></i>
          <i
            v-if="showPwdVisible"
            class="fa-input__icon fa-icon-view fa-input__clear"
            @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="fa-input__count">
            <span class="fa-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <i
          class="fa-input__icon"
          v-if="validateState"
          :class="['fa-input__validateIcon', validateIcon]"
        ></i>
      </span>
      <!-- 后置元素 -->
      <div class="fa-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      :tabindex="tabindex"
      class="fa-textarea__inner"
      @compositionStart="handleCompositionStart"
      @compositionUpdate="handleCompositionUpdate"
      @compositionEnd="handleCompositionEnd"
      @input="handleInput"
      ref="textarea"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      :aria-label="label"
    >
    </textarea>
    <span
      v-if="isWordLimitVisible && type === 'textarea'"
      class="fa-input__count"
    >
      {{ textLength }}/{{ upperLimit }}
    </span>
  </div>
</template>

<script>
import emitter from "Flement/src/mixins/emitter";
import Migirating from "Flement/src/mixins/migrating";
import clacTextareaHeight from "./calcTextareaHeight";
import merge from "Flement/src//utils/merge";
import { isKorean } from "Flement/src//utils/shared";

export default {
  name: "FaInput",

  componentName: "FaInput",

  mixins: [emitter, Migirating],

  inheritAttrs: false,

  inject: {
    faForm: {
      default: ""
    },
    faFormItem: ""
  },

  data() {
    return {
      textareaClacStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    };
  },

  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: "text"
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    /** @deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== "production" &&
          console.warn(
            "[Warn][Input] 'auto-complete' property will be deprecated in next major version. Please use 'autocomplete' instead."
          );
        return true;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },

  computed: {
    _faFromItemSize() {
      return (this.faFormItem || {}).faFormItemSize;
    },
    validateState() {
      return this.faFormItem ? this.faFormItem.validateState : "";
    },
    needStatusIcon() {
      return this.faForm ? this.faForm.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: "fa-icon-loading",
        success: "fa-icon-circle-check",
        error: "fa-icon-circle-close"
      }[this.validateState];
    },
    textareaStyle() {
      return merge({}, this.textareaClacStyle, { resize: this.resize });
    },
    inputSize() {
      return this.size || this._faFromItemSize;
    },
    isWordLimitVisible() {
      return (
        this.showWordLimit &&
        this.$attrs.maxlength &&
        (this.type === "text" || this.type === "textarea") &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
      );
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      if (typeof this.value === "number") {
        return String(this.value).length;
      }

      return (this.value || "").length;
    }
  },
  methods: {
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    getSuffixVisible() {
      return (
        this.$slots.suffix ||
        this.suffixIcon ||
        this.showClear ||
        this.showPassword ||
        this.isWordLimitVisible ||
        (this.validateState && this.needStatusIcon)
      );
    }
  }
};
</script>
