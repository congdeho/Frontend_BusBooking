import PropTypes from 'prop-types'
import classNames from '../../utils/classNames'
import { Link } from 'react-router-dom'

const Button = ({
  type = 'button',
  children,
  className = '',
  isLoading = false,
  ...rest
}) => {
  const child = !!isLoading ? (
    <div
      className={classNames(
        'w-10 h-10 border-4 border-white rounded-full border-t-transparent border-b-transparent animate-spin'
      )}
    ></div>
  ) : (
    children
  )

  let defaultClassName =
    'p-4 text-base font-semibold rounded-xl flex justify-center items-center min-h-[56px]'
  switch (rest.kind) {
    case 'primary':
      defaultClassName = defaultClassName + ' bg-primary-500 text-white'
      break
    case 'secondary':
      defaultClassName = defaultClassName + ' bg-secondary text-white'
      break
    case 'ghost':
      defaultClassName =
        defaultClassName + ' bg-secondary bg-opacity-10 text-secondary'
      break

    default:
      break
  }
  if (rest.href)
    return (
      <Link to={rest.href} className={classNames(defaultClassName, className)}>
        {child}
      </Link>
    )

  return (
    <button
      className={classNames(
        defaultClassName,
        isLoading ? 'opacity-50 pointer-events-none' : '',
        className
      )}
      type={type}
      {...rest}
    >
      {child}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  href: PropTypes.string,
  kind: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
}

export default Button
