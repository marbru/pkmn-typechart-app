import { useState } from 'react'
import './styles.css'
import { EFFECTIVENESSDATA, calculateDamageModifiers } from './pkmndata.js'

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function TypeButton({ type, onClick }) {
  return (
    <button
      key={type}
      className={`type-button type-${type}`}
      onClick={() => onClick(type)}
    >
      <img
        src={`typeicons/${type}.svg`}
        alt={type}
      />
      {capitalize(type)}
    </button>
  )
}

function TypeSelector({ onTargetTypeChange }) {
  return (
    <div>
      {Object.keys(EFFECTIVENESSDATA).map((type) => (
        <TypeButton key={type} type={type} onClick={onTargetTypeChange} />
      ))}
    </div>
  )
}


function TypeTag({ name }) {
  return (
    <div className={`type-tag type-${name}`}>
      <img
        src={`typeicons/${name}.svg`}
        alt={name}
      />
      {capitalize(name)}
    </div>
  )
}

function DamageRow({ types, label }) {
  if (types.length === 0) {
    return;
  }

  return (
    <div className="damage-row">
      <p className="damage-row-label">
        {label}:
      </p>
      <div className="damage-row-types">
        {types.map((type) => <TypeTag key={type} name={type} />)}
      </div>
    </div>
  )
}

function BigTypeBadge({ type }) {
  return (
    <div className={`big-type-badge type-${type}`}>
      <img
        src={`typeicons/${type}.svg`}
        alt={type}
      />
      <h2>
        {capitalize(type)} Type
      </h2>
    </div>
  )
}

function TypeInfo({ targetType }) {
  if (!targetType) {
    return (
      <div className="empty-state">
        <p>Click a type to see its attack & defense modifiers against other types</p>
      </div>
    );
  }

  const damageModifiers = calculateDamageModifiers(targetType);

  return (
    <>
      <BigTypeBadge type={targetType} />
      <div className="type-info-container">
        <div className="type-info-section attacking">
          <h2>⚔️ Attacking</h2>
          <DamageRow label={"Double damage against"} types={damageModifiers.att_double} />
          <DamageRow label={"Half damage against"} types={damageModifiers.att_half} />
          <DamageRow label={"No damage against"} types={damageModifiers.att_null} />
        </div>
        <div className="type-info-section defending">
          <h2>🛡️ Defending</h2>
          <DamageRow label={"Double damage from"} types={damageModifiers.def_double} />
          <DamageRow label={"Half damage from"} types={damageModifiers.def_half} />
          <DamageRow label={"No damage from"} types={damageModifiers.def_null} />
        </div>
      </div>
    </>
  )
}

function App() {
  const [targetType, setTargetType] = useState();
  return (
    <div className="app-container">
      <div className="header-section">
        <h1 className="app-title">
          Pokémon Type Effectiveness Tool
        </h1>
        <TypeSelector onTargetTypeChange={setTargetType} />
      </div>

      <TypeInfo targetType={targetType} />
    </div>
  )
}


export default App;
