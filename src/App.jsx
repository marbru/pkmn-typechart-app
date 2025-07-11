import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles.css'



/* Format: indexed by attacking type, 
values are damage modifiers against defending type.

 Example EFFECTIVENESSDATA["normal"]["rock"] -> 0.5,
 meaning normal type attacks do half damage against rock type.
 */
const EFFECTIVENESSDATA = {
  "normal": {
    "normal": 1,
    "fire": 1,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 1,
    "fighting": 1,
    "poison": 1,
    "ground": 1,
    "flying": 1,
    "psychic": 1,
    "bug": 1,
    "rock": 0.5,
    "ghost": 0,
    "dragon": 1,
    "dark": 1,
    "steel": 0.5,
    "fairy": 1
  },
  "fire": {
    "normal": 1,
    "fire": 0.5,
    "water": 0.5,
    "electric": 1,
    "grass": 2,
    "ice": 2,
    "fighting": 1,
    "poison": 1,
    "ground": 1,
    "flying": 1,
    "psychic": 1,
    "bug": 2,
    "rock": 0.5,
    "ghost": 1,
    "dragon": 0.5,
    "dark": 1,
    "steel": 2,
    "fairy": 1
  },
  "water": {
    "normal": 1,
    "fire": 2,
    "water": 0.5,
    "electric": 1,
    "grass": 0.5,
    "ice": 1,
    "fighting": 1,
    "poison": 1,
    "ground": 2,
    "flying": 1,
    "psychic": 1,
    "bug": 1,
    "rock": 2,
    "ghost": 1,
    "dragon": 0.5,
    "dark": 1,
    "steel": 1,
    "fairy": 1
  },
  "electric": {
    "normal": 1,
    "fire": 1,
    "water": 2,
    "electric": 0.5,
    "grass": 0.5,
    "ice": 1,
    "fighting": 1,
    "poison": 1,
    "ground": 0,
    "flying": 2,
    "psychic": 1,
    "bug": 1,
    "rock": 1,
    "ghost": 1,
    "dragon": 0.5,
    "dark": 1,
    "steel": 1,
    "fairy": 1
  },
  "grass": {
    "normal": 1,
    "fire": 0.5,
    "water": 2,
    "electric": 1,
    "grass": 0.5,
    "ice": 1,
    "fighting": 1,
    "poison": 0.5,
    "ground": 2,
    "flying": 0.5,
    "psychic": 1,
    "bug": 0.5,
    "rock": 2,
    "ghost": 1,
    "dragon": 0.5,
    "dark": 1,
    "steel": 0.5,
    "fairy": 1
  },
  "ice": {
    "normal": 1,
    "fire": 0.5,
    "water": 0.5,
    "electric": 1,
    "grass": 2,
    "ice": 0.5,
    "fighting": 1,
    "poison": 1,
    "ground": 2,
    "flying": 2,
    "psychic": 1,
    "bug": 1,
    "rock": 1,
    "ghost": 1,
    "dragon": 2,
    "dark": 1,
    "steel": 0.5,
    "fairy": 1
  },
  "fighting": {
    "normal": 2,
    "fire": 1,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 2,
    "fighting": 1,
    "poison": 0.5,
    "ground": 1,
    "flying": 0.5,
    "psychic": 0.5,
    "bug": 0.5,
    "rock": 2,
    "ghost": 0,
    "dragon": 1,
    "dark": 2,
    "steel": 2,
    "fairy": 0.5
  },
  "poison": {
    "normal": 1,
    "fire": 1,
    "water": 1,
    "electric": 1,
    "grass": 2,
    "ice": 1,
    "fighting": 1,
    "poison": 0.5,
    "ground": 0.5,
    "flying": 1,
    "psychic": 1,
    "bug": 1,
    "rock": 0.5,
    "ghost": 0.5,
    "dragon": 1,
    "dark": 1,
    "steel": 0,
    "fairy": 2
  },
  "ground": {
    "normal": 1,
    "fire": 2,
    "water": 1,
    "electric": 2,
    "grass": 0.5,
    "ice": 1,
    "fighting": 1,
    "poison": 2,
    "ground": 1,
    "flying": 0,
    "psychic": 1,
    "bug": 0.5,
    "rock": 2,
    "ghost": 1,
    "dragon": 1,
    "dark": 1,
    "steel": 2,
    "fairy": 1
  },
  "flying": {
    "normal": 1,
    "fire": 1,
    "water": 1,
    "electric": 0.5,
    "grass": 2,
    "ice": 1,
    "fighting": 2,
    "poison": 1,
    "ground": 1,
    "flying": 1,
    "psychic": 1,
    "bug": 2,
    "rock": 0.5,
    "ghost": 1,
    "dragon": 1,
    "dark": 1,
    "steel": 0.5,
    "fairy": 1
  },
  "psychic": {
    "normal": 1,
    "fire": 1,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 1,
    "fighting": 2,
    "poison": 2,
    "ground": 1,
    "flying": 1,
    "psychic": 0.5,
    "bug": 1,
    "rock": 1,
    "ghost": 1,
    "dragon": 1,
    "dark": 0,
    "steel": 0.5,
    "fairy": 1
  },
  "bug": {
    "normal": 1,
    "fire": 0.5,
    "water": 1,
    "electric": 1,
    "grass": 2,
    "ice": 1,
    "fighting": 0.5,
    "poison": 0.5,
    "ground": 1,
    "flying": 0.5,
    "psychic": 2,
    "bug": 1,
    "rock": 1,
    "ghost": 0.5,
    "dragon": 1,
    "dark": 2,
    "steel": 0.5,
    "fairy": 0.5
  },
  "rock": {
    "normal": 1,
    "fire": 2,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 2,
    "fighting": 0.5,
    "poison": 1,
    "ground": 0.5,
    "flying": 2,
    "psychic": 1,
    "bug": 2,
    "rock": 1,
    "ghost": 1,
    "dragon": 1,
    "dark": 1,
    "steel": 0.5,
    "fairy": 1
  },
  "ghost": {
    "normal": 0,
    "fire": 1,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 1,
    "fighting": 1,
    "poison": 1,
    "ground": 1,
    "flying": 1,
    "psychic": 2,
    "bug": 1,
    "rock": 1,
    "ghost": 2,
    "dragon": 1,
    "dark": 0.5,
    "steel": 1,
    "fairy": 1
  },
  "dragon": {
    "normal": 1,
    "fire": 1,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 1,
    "fighting": 1,
    "poison": 1,
    "ground": 1,
    "flying": 1,
    "psychic": 1,
    "bug": 1,
    "rock": 1,
    "ghost": 1,
    "dragon": 2,
    "dark": 1,
    "steel": 0.5,
    "fairy": 0
  },
  "dark": {
    "normal": 1,
    "fire": 1,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 1,
    "fighting": 0.5,
    "poison": 1,
    "ground": 1,
    "flying": 1,
    "psychic": 2,
    "bug": 1,
    "rock": 1,
    "ghost": 2,
    "dragon": 1,
    "dark": 0.5,
    "steel": 1,
    "fairy": 0.5
  },
  "steel": {
    "normal": 1,
    "fire": 0.5,
    "water": 0.5,
    "electric": 0.5,
    "grass": 1,
    "ice": 2,
    "fighting": 1,
    "poison": 1,
    "ground": 1,
    "flying": 1,
    "psychic": 1,
    "bug": 1,
    "rock": 2,
    "ghost": 1,
    "dragon": 1,
    "dark": 1,
    "steel": 0.5,
    "fairy": 2
  },
  "fairy": {
    "normal": 1,
    "fire": 0.5,
    "water": 1,
    "electric": 1,
    "grass": 1,
    "ice": 1,
    "fighting": 2,
    "poison": 0.5,
    "ground": 1,
    "flying": 1,
    "psychic": 1,
    "bug": 1,
    "rock": 1,
    "ghost": 1,
    "dragon": 2,
    "dark": 2,
    "steel": 0.5,
    "fairy": 1
  }
};

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
        src={`/assets/types/${type}.svg`}
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
        src={`/assets/types/${name}.svg`}
        alt={name}
      />
      {capitalize(name)}
    </div>
  )
}

function DamageRow({ types, label }) {
  if (types.length === 0) {
    return (
      <div className="damage-row">
        <p className="damage-row-empty">
          {label}: None
        </p>
      </div>
    )
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
        src={`/assets/types/${type}.svg`}
        alt={type}
      />
      <h2>
        {capitalize(type)} Type
      </h2>
    </div>
  )
}

function calculateDamageModifiers(targetType) {
  const damageModifiers = {
    "att_half": [],
    "att_double": [],
    "att_null": [],
    "def_half": [],
    "def_double": [],
    "def_null": [],
  }

  // Attacking effectiveness: fetch effectiveness chart directly by key
  Object.entries(EFFECTIVENESSDATA[targetType]).reduce((acc, [defendingType, modValue]) => {
    if (modValue === 0) {
      acc.att_null.push(defendingType);
    } else if (modValue === 0.5) {
      acc.att_half.push(defendingType);
    } else if (modValue === 2) {
      acc.att_double.push(defendingType);
    }
    return acc;
  }, damageModifiers);

  // Defending effectiveness : we iterate over all attacker types
  // and check the target type in the defendant side 
  Object.entries(EFFECTIVENESSDATA).reduce((acc, [attackingType, effectChart]) => {
    const modValue = effectChart[targetType];
    if (modValue === 0) {
      acc.def_null.push(attackingType);
    } else if (modValue === 0.5) {
      acc.def_half.push(attackingType);
    } else if (modValue === 2) {
      acc.def_double.push(attackingType);
    }
    return acc;
  }, damageModifiers);

  return damageModifiers;
}

function TypeInfo({ targetType }) {
  if (!targetType) {
    return (
      <div className="empty-state">
        <p>Click a type to see its attack & defense modifiers against other types.</p>
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
        {/* <p className="app-description">
          It's super effective!
        </p> */}
      </div>

      <div className="type-selector-container">
        <TypeSelector onTargetTypeChange={setTargetType} />
      </div>

      <TypeInfo targetType={targetType} />
    </div>
  )
}


export default App;
