import cn from "clsx";

const Form = ({ onSubmit, children, className = "" }) => {
  return (
    <form className={cn(className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
