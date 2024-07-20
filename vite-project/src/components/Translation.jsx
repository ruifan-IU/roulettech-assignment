function Translation({ translation }) {
  return (
    <div className='paragraph-container'>
      <p className='note-title'>{translation.content}</p>
    </div>
  );
}

export default Translation;
