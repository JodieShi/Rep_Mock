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
      return this.size || this._faFromItemSize || (this.$FLEMENT || {}).size;
    },
    inputDisabled() {
      return this.disabled || (this.faForm || {}).disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined
        ? ""
        : String(this.value);
    },
    showClear() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      );
    },
    showPwdVisible() {
      return (
        this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (!!this.nativeInputValue || this.focused)
      );
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
    },
    inputExceed() {
      // show exceed style if length of initial value greater than maxlength
      return this.isWordLimitVisible && this.textLength > this.upperLimit;
    }
  },
  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        this.dispatch("FaFormItem", "el.form.change", [val]);
      }
    },
    nativeInputValue() {
      this.setNativeInputValue();
    },
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.resizeTextarea();
        this.updateIconOffset();
      });
    }
  },
  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    getMigratingConfig() {
      return {
        props: {
          icon: "icon is removed, use suffix-icon / prefix-icon instead",
          "on-icon-click": "on-icon-click is removed"
        },
        events: {
          click: "click is removed"
        }
      };
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit("blur", event);
      if (this.validateEvent) {
        this.dispatch("FaFormItem", "fa.form.blur", [this.value]);
      }
    },
    select() {
      this.getInput().select();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type } = this;
      if (type !== "textarea") return;
      if (!autosize) {
        this.textareaClacStyle = {
          minHeight: clacTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaClacStyle = clacTextareaHeight(
        this.$ref.textarea,
        minRows,
        maxRows
      );
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus(event) {
      this.focus = true;
      this.$emit("focus", event);
    },
    handleCompositionstart() {
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || "";
      this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      if (this.isComposing) return;
      if (event.target.value == this.nativeInputValue) return;

      this.$emit("input", event.target.value);
      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.$emit("change", event.target.value);
    },
    clacIconOffset(place) {
      let elList = [].slice.call(
        this.$el.querySelectorAll(`.el-input__${place}`) || []
      );
      if (!elList.length) return;
      let el = null;
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: "append",
        prefix: "prepend"
      };

      const pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === "suffix" ? "-" : ""}${
          this.$el.querySelectorAll(`.el-input-group__${pendant}`).offsetWidth
        }px)`;
      } else {
        el.removeAttribute("style");
      }
    },
    updateIconOffset() {
      this.clacIconOffset("prefix");
      this.clacIconOffset("suffix");
    },
    clear() {
      this.$emit("input", "");
      this.$emit("change", "");
      this.$emit("clear");
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
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
  },
  created() {
    this.$on("inputSelect", this.select);
  },

  mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
  },
  updated() {
    this.$nextTick(this.updateIconOffset);
  }
};
</script>
