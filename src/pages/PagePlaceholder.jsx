function PagePlaceholder({ title, description }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-slate-500">{description}</p>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-slate-500">
          This page layout will be developed in the next step.
        </p>
      </div>
    </div>
  );
}

export default PagePlaceholder;