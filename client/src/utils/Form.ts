import * as Yup from "yup";

export const NewTaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "- Title is too short")
    .required("- Please provide a title."),
  subtasks: Yup.array()
    .min(1)
    .of(
      Yup.object().shape({
        title: Yup.string()
          .min(3, "- title is too short.")
          .max(50, "- Name over 100 character limit")
          .required("- Please input at least one subtask"),
        isCompleted: Yup.boolean().required(),
      })
    ),
});

export const NewBoardSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "- Name is too short.")
    .max(100, "- Name over 100 character limit")
    .required("- Please give the board a name"),
  columns: Yup.array().min(1, "- Please input a column"),
});
