import { Fragment } from "react";
import { assetNamed } from "../content/assets";
import { Claim } from "../components/Claim";
import { Tag } from "../components/Tag";
import { build, Frame } from "./Frame";
import { d3Competition, d3Financials, d3GoToMarket, d3Status, d3Team, type Line } from "./content6to10";
import "./draft3-6-10.css";

/** Slides 6 to 10 (Kawasaki brief), in the Draft 3 keynote style. */
export function SlidesSixToTen() {
  return (
    <>
      <GoToMarket />
      <Competition />
      <Team />
      <Financials />
      <Status />
    </>
  );
}

/** Renders a line of plain text, bold, assumptions, evidence and placeholders. */
function L({ line }: { line: Line }) {
  return (
    <>
      {line.map((seg, i) => {
        if (typeof seg === "string") return <Fragment key={i}>{seg}</Fragment>;
        if ("b" in seg) return <strong key={i}>{seg.b}</strong>;
        if ("claim" in seg)
          return (
            <Claim key={i} id={seg.claim}>
              {seg.text}
            </Claim>
          );
        if ("evidence" in seg) return <Tag key={i} kind="evidence" source={seg.evidence} />;
        return <Tag key={i} kind="placeholder" id={seg.placeholder} />;
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Go-to-market                                                     */
/* ------------------------------------------------------------------ */

function GoToMarket() {
  const c = d3GoToMarket;
  return (
    <Frame slide={c} index={5}>
      <div className="d3-page">
        <h2 className="d3-page__title d3-in" style={build(0)}>
          {c.headline}
        </h2>

        <div className="d3-ladder d3-in" style={build(1)}>
          <p className="d3-ladder__label">
            <L line={c.pathLabel} />
          </p>
          <div className="d3-ladder__track">
            <span className="d3-ladder__here">
              <span className="d3-ladder__here-dot" aria-hidden="true" />
              {c.youAreHere}
            </span>
            {c.steps.map((s, i) => (
              <div key={s.label} className="d3-ladder__step">
                <span className="d3-ladder__node" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="d3-ladder__name">{s.label}</span>
                {s.sub.length > 0 && (
                  <span className="d3-ladder__sub">
                    <L line={s.sub} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="d3-trio">
          {c.blocks.map((b, i) => (
            <div key={b.heading} className="d3-trio__item d3-in" style={build(2 + i)}>
              <h3 className="d3-kicker">{b.heading}</h3>
              <p className="d3-body">
                <L line={b.body} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Competition                                                      */
/* ------------------------------------------------------------------ */

function Competition() {
  const c = d3Competition;
  return (
    <Frame slide={c} index={6}>
      <div className="d3-page">
        <h2 className="d3-page__title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <table className="d3-table d3-in" style={build(1)}>
          <thead>
            <tr>
              {c.columns.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r) => (
              <tr key={r.option}>
                <th scope="row">{r.option}</th>
                <td>
                  <L line={r.strength} />
                </td>
                <td>
                  <L line={r.weakness} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="d3-position d3-in" style={build(2)}>
          <L line={c.position} />
        </p>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Team                                                             */
/* ------------------------------------------------------------------ */

function Team() {
  const c = d3Team;
  return (
    <Frame slide={c} index={7}>
      <div className="d3-page">
        <h2 className="d3-page__title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <div className="d3-team">
          {c.people.map((p, i) => {
            const photo = assetNamed(p.photo);
            return (
              <div key={p.name} className="d3-person d3-in" style={build(1 + i)}>
                <div className="d3-person__face">
                  {photo ? <img src={photo} alt={p.name} /> : <span aria-hidden="true">{p.initials}</span>}
                </div>
                <h3 className="d3-person__name">{p.name}</h3>
                <p className="d3-person__role">{p.role}</p>
                <p className="d3-person__proof">
                  <L line={p.proof} />
                </p>
              </div>
            );
          })}
          <div className="d3-person d3-person--hire d3-in" style={build(4)}>
            <div className="d3-person__face d3-person__face--empty" aria-hidden="true">
              +
            </div>
            <h3 className="d3-person__name">{c.hireLabel}</h3>
            <p className="d3-person__hire">{c.hire}</p>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Financials                                                       */
/* ------------------------------------------------------------------ */

const CHART_W = 780;
const CHART_H = 160;
const BAR_W = 120;

function Financials() {
  const c = d3Financials;
  const colX = (i: number) => 300 + i * 160 + 80; // centres of the three year columns
  const y = (v: number) => CHART_H - (v / c.ceiling.value) * (CHART_H - 40);
  return (
    <Frame slide={c} index={8}>
      <div className="d3-page">
        <h2 className="d3-page__title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <div className="d3-fin">
          <div className="d3-fin__units d3-in" style={build(1)}>
            <h3 className="d3-kicker">{c.unitHeading}</h3>
            <div className="d3-units">
              <span />
              <span className="d3-units__head">{c.perLitre}</span>
              <span className="d3-units__head">{c.perGram}</span>
              {c.units.map((u) => (
                <Fragment key={u.label}>
                  <span className="d3-units__label">{u.label}</span>
                  <span className="d3-units__big">
                    <Claim id={u.litre.claim}>{u.litre.text}</Claim>
                  </span>
                  <span className="d3-units__small">{u.gram}</span>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="d3-fin__years d3-in" style={build(2)}>
            <Claim id={c.stepsClaim} block note={c.yearsNote}>
              <h3 className="d3-kicker">{c.yearsHeading}</h3>
              <figure className="d3-chart" style={{ width: CHART_W, height: CHART_H + 50 }}>
                <svg width={CHART_W} height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`} aria-hidden="true">
                  <line className="d3-chart__ceiling" x1={300} x2={CHART_W} y1={y(c.ceiling.value)} y2={y(c.ceiling.value)} />
                  <line className="d3-chart__base" x1={300} x2={CHART_W} y1={CHART_H - 0.5} y2={CHART_H - 0.5} />
                  {c.years.map((yr, i) => (
                    <rect
                      key={yr.label}
                      className="d3-chart__bar"
                      x={colX(i) - BAR_W / 2}
                      y={y(yr.revenue) - (yr.revenue ? 0 : 2)}
                      width={BAR_W}
                      height={Math.max(2, CHART_H - y(yr.revenue))}
                      rx={3}
                    />
                  ))}
                </svg>
                <span className="d3-chart__ceiling-label" style={{ left: 300, top: y(c.ceiling.value) - 26 }}>
                  {c.ceiling.label}
                </span>
                {c.years.map((yr, i) => (
                  <Fragment key={yr.label}>
                    <span className="d3-chart__value" style={{ left: colX(i), top: y(yr.revenue) - 30 }}>
                      {yr.revenueText}
                    </span>
                    <span className="d3-chart__year" style={{ left: colX(i), top: CHART_H + 8 }}>
                      <strong>{yr.label}</strong> {yr.span}
                    </span>
                  </Fragment>
                ))}
              </figure>
              <table className="d3-years">
                <tbody>
                  {c.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td key={i}>
                          <L line={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Claim>
          </div>
        </div>
        <p className="d3-honest d3-in" style={build(3)}>
          {c.honest}
        </p>
      </div>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 10. Status and ask                                                  */
/* ------------------------------------------------------------------ */

function Status() {
  const c = d3Status;
  return (
    <Frame slide={c} index={9}>
      <div className="d3-page">
        <h2 className="d3-page__title d3-in" style={build(0)}>
          {c.headline}
        </h2>
        <p className="d3-today d3-in" style={build(1)}>
          <strong>{c.todayLabel}</strong> <L line={c.today} />
        </p>
        <div className="d3-quarters d3-in" style={build(2)}>
          <p className="d3-quarters__label">{c.quartersLabel}</p>
          <div className="d3-quarters__grid">
            {c.quarters.map((q) => (
              <div key={q.q} className={`d3-quarter${q.pivot ? " d3-quarter--pivot" : ""}`}>
                <span className="d3-quarter__node" aria-hidden="true">
                  {q.pivot && (
                    <svg width="44" height="36" viewBox="0 0 44 36">
                      <path d="M4 18 H18 L38 4 M18 18 L38 32" />
                    </svg>
                  )}
                </span>
                <h3 className="d3-quarter__q">
                  {q.q} <span>{q.months}</span>
                </h3>
                <p className="d3-quarter__milestone">{q.milestone}</p>
                <p className="d3-quarter__gate">
                  <span className="d3-quarter__gate-label">{c.gateLabel}</span>
                  <L line={q.gate} />
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="d3-ask d3-in" style={build(3)}>
          <h3 className="d3-ask__label">{c.askLabel}</h3>
          <p className="d3-ask__text">{c.ask}</p>
        </div>
      </div>
    </Frame>
  );
}
