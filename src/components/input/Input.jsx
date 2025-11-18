import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../common/ErrorComponent";
import classNames from "../../utils/classNames";

const Input = (props) => {
  const {
    control,
    name,
    type = "text",
    error = "",
    placeholder = "",
    children,
    ...rest
  } = props;

  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  const hasError = !!error && error.length > 0;

  return (
    <div className="flex flex-col gap-1 relative">
      <div className="relative">
        <input
          id={name}
          type={type}
          {...field}
          {...rest}
          placeholder={placeholder}
          className={classNames(
            "w-full px-6 py-4 text-sm font-medium border rounded-xl text-black placeholder:text-gray-400 bg-transparent dark:placeholder-gray-500 transition-all duration-200",
            hasError
              ? "border-error text-error focus:border-error"
              : "border-strock text-black dark:border-darkStrock focus:border-primary-500",
            children ? "pr-16" : ""
          )}
        />

        {children && (
          <span className="absolute cursor-pointer select-none right-6 top-1/2 -translate-y-1/2">
            {children}
          </span>
        )}
      </div>

      {hasError && (
        <span className="text-sm font-medium text-error mt-0.5">
          {error}
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  control: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  children: PropTypes.node,
};

export default withErrorBoundary(Input, {
  FallbackComponent: ErrorComponent,
});
