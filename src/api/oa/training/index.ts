import { Alova } from "@/utils/http/alova/index";

// 导出统一的接口方法
export function getTrainingList(params) {
  return Alova.Get("/oa/training/list", { params });
}

export function addTraining(data) {
  return Alova.Post("/oa/training/add", data);
}

export function updateTraining(data) {
  return Alova.Put("/oa/training/update", data);
}

export function deleteTraining(id) {
  return Alova.Delete(`/oa/training/delete/${id}`);
}
