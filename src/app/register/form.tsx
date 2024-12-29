import EmailRegister from './EmailRegister'

export default function Form() {
  return (
    <>
      <div className="text-3xl font-bold text-center mt-10">注册</div>
      <div className="w-full max-w-lg mx-auto p-6">
        <EmailRegister />
      </div>
    </>
  )
}
