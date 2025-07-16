<template>
  <basicModal @register="modalRegister" ref="modalRef" @on-ok="okModal">
    <div class="pt-8">
      <BasicForm @register="registerForm" />
    </div>
  </basicModal>
</template>

<script lang="ts" setup>
import { FormSchema, useForm } from "@/components/Form";
import { basicModal, useModal } from "@/components/Modal";

const schemas: FormSchema[] = [
  {
    field: "topic",
    component: "NInput",
    label: "培训主题",
    componentProps: {
      placeholder: "请输入培训主题",
    },
    rules: [{ required: true, message: "请输入培训主题", trigger: ["blur"] }],
  },
  {
    field: "content",
    component: "NInput",
    label: "培训内容",
    componentProps: {
      type: "textarea",
      placeholder: "请输入角色角色说明",
    },
  },
  {
    field: "location",
    component: "NSwitch",
    label: "培训地点",
    componentProps: {},
  },
];

// 表单验证规则
const rules = {
  topic: [{ required: true, message: "请输入培训主题", trigger: "blur" }],
  content: [{ required: true, message: "请输入培训内容", trigger: "blur" }],
  trainingTime: [{ required: true, message: "请选择培训时间", trigger: "change" }],
  location: [{ required: true, message: "请输入培训地点", trigger: "blur" }],
  participants: [{ required: true, message: "请选择参与人员", trigger: "change" }],
};

const [registerForm, { submit }] = useForm({
  gridProps: { cols: 1 },
  collapsedRows: 3,
  labelWidth: 80,
  layout: "horizontal",
  submitButtonText: "保存",
  showActionButtonGroup: false,
  schemas,
});

const [modalRegister, { openModal, closeModal, setSubLoading }] = useModal({
  title: "新增培训记录",
  subBtuText: "保存",
});

async function okModal() {
  const formRes = await submit();
  if (formRes) {
    closeModal();
    console.log("formRes", formRes);
  } else {
    setSubLoading(false);
  }
}

defineExpose({
  openModal,
});
</script>
