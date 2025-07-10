import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles.css'



/* Format: indexed by attacking type, effectiveness has the 
 damage modifier against defending type.

 Example TYPEDATA["normal"].effectiveness["rock"] -> 0.5,
 meaning normal type attacks do half damage against rock type.
 */
const TYPEDATA = {
  "normal": {
    "name": "Normal",
    "color": "#A8A878",
    "effectiveness": {
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
    }
  },
  "fire": {
    "name": "Fire",
    "color": "#F08030",
    "effectiveness": {
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
    }
  },
  "water": {
    "name": "Water",
    "color": "#6890F0",
    "effectiveness": {
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
    }
  },
  "electric": {
    "name": "Electric",
    "color": "#F8D030",
    "effectiveness": {
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
    }
  },
  "grass": {
    "name": "Grass",
    "color": "#78C850",
    "effectiveness": {
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
    }
  },
  "ice": {
    "name": "Ice",
    "color": "#98D8D8",
    "effectiveness": {
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
    }
  },
  "fighting": {
    "name": "Fighting",
    "color": "#C03028",
    "effectiveness": {
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
    }
  },
  "poison": {
    "name": "Poison",
    "color": "#A040A0",
    "effectiveness": {
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
    }
  },
  "ground": {
    "name": "Ground",
    "color": "#E0C068",
    "effectiveness": {
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
    }
  },
  "flying": {
    "name": "Flying",
    "color": "#A890F0",
    "effectiveness": {
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
    }
  },
  "psychic": {
    "name": "Psychic",
    "color": "#F85888",
    "effectiveness": {
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
    }
  },
  "bug": {
    "name": "Bug",
    "color": "#A8B820",
    "effectiveness": {
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
    }
  },
  "rock": {
    "name": "Rock",
    "color": "#B8A038",
    "effectiveness": {
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
    }
  },
  "ghost": {
    "name": "Ghost",
    "color": "#705898",
    "effectiveness": {
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
    }
  },
  "dragon": {
    "name": "Dragon",
    "color": "#7038F8",
    "effectiveness": {
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
    }
  },
  "dark": {
    "name": "Dark",
    "color": "#705848",
    "effectiveness": {
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
    }
  },
  "steel": {
    "name": "Steel",
    "color": "#B8B8D0",
    "effectiveness": {
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
    }
  },
  "fairy": {
    "name": "Fairy",
    "color": "#EE99AC",
    "effectiveness": {
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
  }
};

function TypeButton({ type, onClick }) {
  return (
    <button key={type} style={{ display: "inline-flex", alignItems: 'center', margin: '0.25rem' }}>
      <img
        src={`/assets/types/${type}.svg`}
        alt={type}
        style={{ width: 24, height: 24, marginRight: 8 }}
      />
      {type}
    </button>
  )
}



function TypeSelector() {
  return (
    <div>
      {Object.keys(TYPEDATA).map((type) => (
        <TypeButton key={type} type={type} />
      ))}
    </div>
  )
}


function TypeTag({ name }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: 'center',
        margin: '0.25rem',
        backgroundColor: TYPEDATA[name]?.color || "#eee",
        borderRadius: "12px",
        padding: "0.25rem 0.75rem",
      }}
    >
      <img
        src={`/assets/types/${name}.svg`}
        alt={name}
        style={{ width: 24, height: 24, marginRight: 8 }}
      />
      {name}
    </div>
  )
}

function DamageRow({ types, label }) {
  return (
    <>
      <p>{label}: </p>
      {types.map((type) => <TypeTag key={type} name={type} />)}
    </>
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
  Object.entries(TYPEDATA[targetType].effectiveness).reduce((acc, [defendingType, modValue]) => {
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
  Object.entries(TYPEDATA).reduce((acc, [attackingType, effectChart]) => {
    const modValue = effectChart.effectiveness[targetType];
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
  const damageModifiers = calculateDamageModifiers(targetType);

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div>
        <h2>⚔️ Attacking</h2>
        <DamageRow label={"Double damage against"} types={damageModifiers.att_double} />
        <DamageRow label={"Half damage against"} types={damageModifiers.att_half} />
        <DamageRow label={"No damage against"} types={damageModifiers.att_null} />

      </div>
      <div>
        <h2>🛡️ Defending</h2>
        <DamageRow label={"Double damage from"} types={damageModifiers.def_double} />
        <DamageRow label={"Half damage from"} types={damageModifiers.def_half} />
        <DamageRow label={"No damage from"} types={damageModifiers.def_null} />
      </div>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>Pokemon Type Effectiveness</h1>
      <p>Click a type to see its attack & defense modfiers against other types.</p>
      <TypeSelector />
      <TypeInfo targetType="normal" />

    </div>
  )
}


export default App;
