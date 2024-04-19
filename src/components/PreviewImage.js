import { useEffect } from "react";

const PreviewImage = (props) => {
  // cria uma visualização sempre que o arquivo selecionado for alterado
  useEffect(() => {
    if (!props.selectedFile) {
      props.setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(props.selectedFile);
    props.setPreview(objectUrl);

    // liberar memória sempre que este componente for desmontado
    return () => URL.revokeObjectURL(objectUrl);
  }, [props.selectedFile]);

  return (
    <div className="flex justify-center py-5">
      {props.image || props.selectedFile ? (
        <img
          src={
            props.preview
              ? props.preview
              : `http://localhost:5000/assets/users/${props.image}`
          }
          alt="avatar"
          className="w-44 h-44 rounded-full border-8"
        />
      ) : (
        <img
          src={props.ImageNotFound}
          alt="Avatar"
          className="w-28 h-28 rounded-full bg-gray-400"
        />
      )}
    </div>
  );
};

export default PreviewImage;
