package org.alien4cloud.tosca.model.templates;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.alien4cloud.tosca.model.types.NodeType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor(suppressConstructorProperties = true)
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class SubstitutionMapping {
    private String substitutionType;

    private Map<String, SubstitutionTarget> capabilities;
    private Map<String, SubstitutionTarget> requirements;

    /** Specific alien4cloud properties to configure a relationship to use for services. */
    private Map<String, String> capabilitiesServiceRelationships;
    private Map<String, String> requirementsServiceRelationships;
}