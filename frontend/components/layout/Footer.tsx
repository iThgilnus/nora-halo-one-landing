export function Footer() {
  return (
    <footer className="border-t border-line bg-page px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p className="font-semibold text-ink">NORA Halo One</p>
        <p className="max-w-3xl leading-7">
          &copy; {new Date().getFullYear()} NORA. Bảo lưu mọi quyền. Tất cả các thiết kế sản phẩm, nhãn hiệu và công nghệ được đăng ký bản quyền bởi NORA.
        </p>
      </div>
    </footer>
  );
}
