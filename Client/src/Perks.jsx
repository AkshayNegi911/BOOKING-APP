export default function Perks({ selected, onChange }) {
  function handeleCbClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onChange([...selected,name])
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)])
    }
  }

  return (
    <div>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handeleCbClick} />
        <svg
          xmlns="https://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handeleCbClick} />
        <svg
          xmlns="https://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <span>free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handeleCbClick} />
        <svg
          xmlns="https://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('radio')} name="radio" onChange={handeleCbClick} />
        <svg
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M17.45 3.473a.75.75 0 10-.4-1.446L5.313 5.265c-.84.096-1.671.217-2.495.362A2.212 2.212 0 001 7.817v7.933A2.25 2.25 0 003.25 18h13.5A2.25 2.25 0 0019 15.75V7.816c0-1.06-.745-2-1.817-2.189a41.124 41.124 0 00-5.406-.589l5.673-1.565zM16 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM14.5 16a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-9.26-5a.75.75 0 01.75-.75H6a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V11zm2.75-.75a.75.75 0 00-.75.75v.01c0 .415.336.75.75.75H8a.75.75 0 00.75-.75V11a.75.75 0 00-.75-.75h-.01zm-1.75-1.5A.75.75 0 016.99 8H7a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm3.583.42a.75.75 0 00-1.06 0l-.007.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.06 0l.007-.007a.75.75 0 000-1.061l-.007-.007zm.427 2.08A.75.75 0 0111 12v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75h.01zm-.42 3.584a.75.75 0 000-1.061l-.007-.007a.75.75 0 00-1.06 0l-.007.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.06 0l.008-.007zm-3.59.416a.75.75 0 01.75-.75H7a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm-1.013-1.484a.75.75 0 00-1.06 0l-.008.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.061 0l.007-.007a.75.75 0 000-1.061l-.007-.007zM3.75 11.25a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V12a.75.75 0 01.75-.75h.01zm1.484-1.012a.75.75 0 000-1.061l-.007-.007a.75.75 0 00-1.06 0l-.007.007a.75.75 0 000 1.06l.007.008a.75.75 0 001.06 0l.007-.007zM7.24 13a.75.75 0 01.75-.75H8a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V13zm-1.25-.75a.75.75 0 00-.75.75v.01c0 .415.336.75.75.75H6a.75.75 0 00.75-.75V13a.75.75 0 00-.75-.75h-.01z"
            clipRule="evenodd"
          />
        </svg>
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handeleCbClick} />
        <svg
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-4.464a.75.75 0 10-1.061-1.061 3.5 3.5 0 01-4.95 0 .75.75 0 00-1.06 1.06 5 5 0 007.07 0zM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5z"
            clipRule="evenodd"
          />
        </svg>
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handeleCbClick} />
        <svg
          xmlns="https://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M13.75 7h-3v5.296l1.943-2.048a.75.75 0 011.114 1.004l-3.25 3.5a.75.75 0 01-1.114 0l-3.25-3.5a.75.75 0 111.114-1.004l1.943 2.048V7h1.5V1.75a.75.75 0 00-1.5 0V7h-3A2.25 2.25 0 004 9.25v7.5A2.25 2.25 0 006.25 19h7.5A2.25 2.25 0 0016 16.75v-7.5A2.25 2.25 0 0013.75 7z" />
        </svg>

        <span>Private Entrance</span>
      </label>
    </div>
  );
}
