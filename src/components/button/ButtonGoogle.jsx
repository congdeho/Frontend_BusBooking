import PropTypes from 'prop-types'
import { withErrorBoundary } from 'react-error-boundary'
import ErrorComponent from '../common/ErrorComponent'

const ButtonGoogle = ({ text = 'Tiếp tục với Google', onClick = () => {}, className = '' }) => {
  return (
    <button
      type="button"
      aria-label={text}
      onClick={onClick}
      className={
        `flex items-center justify-center w-full px-6 py-3 mb-5 bg-white border border-strock rounded-xl gap-4 shadow-sm ${className}`
      }
    >
      <img src="/icon-google.png" alt="Google" className="w-6 h-6" />
      <span className="text-lg font-semibold text-primary-600 text-center">{text}</span>
    </button>
  )
}

ButtonGoogle.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default withErrorBoundary(ButtonGoogle, {
  FallbackComponent: ErrorComponent,
})
